const {
	Color,
	FileLoader,
	FrontSide,
	Loader,
	LoaderUtils,
	MeshPhongMaterial,
	RepeatWrapping,
	TextureLoader,
	Vector2,
	SRGBColorSpace
} = require('../Four');


class MTLLoader extends Loader {
	constructor(manager) {
		super(manager);
	}

	load(object, onLoad, onProgress, onError) {
		const url = `./models/${object.mtl}`;
		const path = this.path || LoaderUtils.extractUrlBase(url);

		const loader = new FileLoader(this.manager);
		loader.setPath(this.path);
		loader.load(object, text => {
			try {
				onLoad(this.parse(text, path));
			} catch (e) {
				onError ? onError(e) : console.error(e);
				this.manager.itemError(url);
			}
		}, onProgress, onError);
	}

	setMaterialOptions(value) {
		this.materialOptions = value;
		return this;
	}

	parse(text, path) {
		const lines = text.split('\n');
		const materialsInfo = {};
		let info = {};

		for (const line of lines) {
			const trimmedLine = line.trim();

			if (!trimmedLine || trimmedLine.charAt(0) === '#') continue;

			const [key, ...valueParts] = trimmedLine.split(/\s+/);
			const value = valueParts.join(' ').trim();

			if (key.toLowerCase() === 'newmtl') {
				info = { name: value };
				materialsInfo[value] = info;
			} else {
				info[key] = ['ka', 'kd', 'ks', 'ke'].includes(key)
					? value.split(/\s+/, 3).map(parseFloat)
					: value;
			}
		}

		const materialCreator = new MaterialCreator(this.resourcePath || path, this.materialOptions);
		materialCreator.setManager(this.manager);
		materialCreator.setMaterials(materialsInfo);
		return materialCreator;
	}
}

class MaterialCreator {
	constructor(baseUrl = '', options = {}) {
		this.baseUrl = baseUrl;
		this.options = options;
		this.materialsInfo = {};
		this.materials = {};
		this.materialsArray = [];
		this.nameLookup = {};
		this.crossOrigin = 'anonymous';
		this.side = options.side ?? FrontSide;
		this.wrap = options.wrap ?? RepeatWrapping;
	}

	setManager(value) {
		this.manager = value;
	}

	setMaterials(materialsInfo) {
		this.materialsInfo = this.convert(materialsInfo);
		this.materials = {};
		this.materialsArray = [];
		this.nameLookup = {};
	}

	convert(materialsInfo) {
		if (!this.options) return materialsInfo;

		const converted = {};

		for (const mn in materialsInfo) {
			const mat = materialsInfo[mn];
			const covmat = {};
			converted[mn] = covmat;

			for (const prop in mat) {
				let save = true;
				let value = mat[prop];
				const lprop = prop.toLowerCase();

				if (lprop === 'kd' || lprop === 'ka' || lprop === 'ks') {
					if (this.options.normalizeRGB) {
						value = value.map(v => v / 255);
					}
					if (this.options.ignoreZeroRGBs && value.every(v => v === 0)) {
						save = false;
					}
				}

				if (save) {
					covmat[lprop] = value;
				}
			}
		}

		return converted;
	}

	preload() {
		for (const mn in this.materialsInfo) {
			this.create(mn);
		}
	}

	getIndex(materialName) {
		return this.nameLookup[materialName];
	}

	getAsArray() {
		return Object.keys(this.materialsInfo).map((mn, index) => {
			this.materialsArray[index] = this.create(mn);
			this.nameLookup[mn] = index;
			return this.materialsArray[index];
		});
	}

	create(materialName) {
		if (!this.materials[materialName]) {
			this.createMaterial(materialName);
		}

		return this.materials[materialName];
	}

	async createMaterial(materialName) {
		const mat = this.materialsInfo[materialName];
		const params = {
			name: materialName,
			side: this.side
		};

		const setMapForType = async (mapType, value) => {
			if (params[mapType]) return;

			const texParams = this.getTextureParams(value, params);
			const map = await this.loadTexture(this.resolveURL(this.baseUrl, texParams.url));

			map.repeat.copy(texParams.scale);
			map.offset.copy(texParams.offset);
			map.wrapS = this.wrap;
			map.wrapT = this.wrap;

			if (mapType === 'map' || mapType === 'emissiveMap') {
				map.colorSpace = SRGBColorSpace;
			}

			params[mapType] = map;
		};

		for (const prop in mat) {
			const value = mat[prop];
			if (value === '') continue;

			switch (prop.toLowerCase()) {
				case 'kd':
					params.color = new Color().fromArray(value).convertSRGBToLinear();
					break;
				case 'ks':
					params.specular = new Color().fromArray(value).convertSRGBToLinear();
					break;
				case 'ke':
					params.emissive = new Color().fromArray(value).convertSRGBToLinear();
					break;
				case 'map_kd':
					await setMapForType('map', value);
					break;
				case 'map_ks':
					await setMapForType('specularMap', value);
					break;
				case 'map_ke':
					await setMapForType('emissiveMap', value);
					break;
				case 'norm':
					await setMapForType('normalMap', value);
					break;
				case 'map_bump':
				case 'bump':
					await setMapForType('bumpMap', value);
					break;
				case 'map_d':
					await setMapForType('alphaMap', value);
					params.transparent = true;
					break;
				case 'ns':
					params.shininess = parseFloat(value);
					break;
				case 'd':
					const dn = parseFloat(value);
					if (dn < 1) {
						params.opacity = dn;
						params.transparent = true;
					}
					break;
				case 'tr':
					let trn = parseFloat(value);
					if (this.options && this.options.invertTrProperty) trn = 1 - trn;
					if (trn > 0) {
						params.opacity = 1 - trn;
						params.transparent = true;
					}
					break;
				default:
					break;
			}
		}

		this.materials[materialName] = new MeshPhongMaterial(params);
		return this.materials[materialName];
	}

	getTextureParams(value, matParams) {
		const texParams = {
			scale: new Vector2(1, 1),
			offset: new Vector2(0, 0)
		};

		const items = value.split(/\s+/);
		let pos;

		pos = items.indexOf('-bm');
		if (pos >= 0) {
			matParams.bumpScale = parseFloat(items[pos + 1]);
			items.splice(pos, 2);
		}

		pos = items.indexOf('-s');
		if (pos >= 0) {
			texParams.scale.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
			items.splice(pos, 4);
		}

		pos = items.indexOf('-o');
		if (pos >= 0) {
			texParams.offset.set(parseFloat(items[pos + 1]), parseFloat(items[pos + 2]));
			items.splice(pos, 4);
		}

		texParams.url = items.join(' ').trim();
		return texParams;
	}

	async loadTexture(url, mapping, onLoad, onProgress, onError) {
		const loader = new TextureLoader(this.manager);
		const texture = await new Promise((resolve, reject) => {
			loader.load(url, resolve, onProgress, onError);
		});
		return texture;
	}

	resolveURL(baseUrl, url) {
		if (typeof url !== 'string' || url === '') {
			return '';
		}
		return (baseUrl + url).replace('/./', '/');
	}
}

module.exports = { MTLLoader };