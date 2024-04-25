const alphahash_fragment = require('./ShaderChunk/alphahash_fragment.glsl.js');
const alphahash_pars_fragment = require('./ShaderChunk/alphahash_pars_fragment.glsl.js');
const alphamap_fragment = require('./ShaderChunk/alphamap_fragment.glsl.js');
const alphamap_pars_fragment = require('./ShaderChunk/alphamap_pars_fragment.glsl.js');
const alphatest_fragment = require('./ShaderChunk/alphatest_fragment.glsl.js');
const alphatest_pars_fragment = require('./ShaderChunk/alphatest_pars_fragment.glsl.js');
const aomap_fragment = require('./ShaderChunk/aomap_fragment.glsl.js');
const aomap_pars_fragment = require('./ShaderChunk/aomap_pars_fragment.glsl.js');
const batching_pars_vertex = require('./ShaderChunk/batching_pars_vertex.glsl.js');
const batching_vertex = require('./ShaderChunk/batching_vertex.glsl.js');
const begin_vertex = require('./ShaderChunk/begin_vertex.glsl.js');
const beginnormal_vertex = require('./ShaderChunk/beginnormal_vertex.glsl.js');
const bsdfs = require('./ShaderChunk/bsdfs.glsl.js');
const iridescence_fragment = require('./ShaderChunk/iridescence_fragment.glsl.js');
const bumpmap_pars_fragment = require('./ShaderChunk/bumpmap_pars_fragment.glsl.js');
const clipping_planes_fragment = require('./ShaderChunk/clipping_planes_fragment.glsl.js');
const clipping_planes_pars_fragment = require('./ShaderChunk/clipping_planes_pars_fragment.glsl.js');
const clipping_planes_pars_vertex = require('./ShaderChunk/clipping_planes_pars_vertex.glsl.js');
const clipping_planes_vertex = require('./ShaderChunk/clipping_planes_vertex.glsl.js');
const color_fragment = require('./ShaderChunk/color_fragment.glsl.js');
const color_pars_fragment = require('./ShaderChunk/color_pars_fragment.glsl.js');
const color_pars_vertex = require('./ShaderChunk/color_pars_vertex.glsl.js');
const color_vertex = require('./ShaderChunk/color_vertex.glsl.js');
const common = require('./ShaderChunk/common.glsl.js');
const cube_uv_reflection_fragment = require('./ShaderChunk/cube_uv_reflection_fragment.glsl.js');
const defaultnormal_vertex = require('./ShaderChunk/defaultnormal_vertex.glsl.js');
const displacementmap_pars_vertex = require('./ShaderChunk/displacementmap_pars_vertex.glsl.js');
const displacementmap_vertex = require('./ShaderChunk/displacementmap_vertex.glsl.js');
const emissivemap_fragment = require('./ShaderChunk/emissivemap_fragment.glsl.js');
const emissivemap_pars_fragment = require('./ShaderChunk/emissivemap_pars_fragment.glsl.js');
const colorspace_fragment = require('./ShaderChunk/colorspace_fragment.glsl.js');
const colorspace_pars_fragment = require('./ShaderChunk/colorspace_pars_fragment.glsl.js');
const envmap_fragment = require('./ShaderChunk/envmap_fragment.glsl.js');
const envmap_common_pars_fragment = require('./ShaderChunk/envmap_common_pars_fragment.glsl.js');
const envmap_pars_fragment = require('./ShaderChunk/envmap_pars_fragment.glsl.js');
const envmap_pars_vertex = require('./ShaderChunk/envmap_pars_vertex.glsl.js');
const envmap_vertex = require('./ShaderChunk/envmap_vertex.glsl.js');
const fog_vertex = require('./ShaderChunk/fog_vertex.glsl.js');
const fog_pars_vertex = require('./ShaderChunk/fog_pars_vertex.glsl.js');
const fog_fragment = require('./ShaderChunk/fog_fragment.glsl.js');
const fog_pars_fragment = require('./ShaderChunk/fog_pars_fragment.glsl.js');
const gradientmap_pars_fragment = require('./ShaderChunk/gradientmap_pars_fragment.glsl.js');
const lightmap_fragment = require('./ShaderChunk/lightmap_fragment.glsl.js');
const lightmap_pars_fragment = require('./ShaderChunk/lightmap_pars_fragment.glsl.js');
const lights_lambert_fragment = require('./ShaderChunk/lights_lambert_fragment.glsl.js');
const lights_lambert_pars_fragment = require('./ShaderChunk/lights_lambert_pars_fragment.glsl.js');
const lights_pars_begin = require('./ShaderChunk/lights_pars_begin.glsl.js');
const envmap_physical_pars_fragment = require('./ShaderChunk/envmap_physical_pars_fragment.glsl.js');
const lights_toon_fragment = require('./ShaderChunk/lights_toon_fragment.glsl.js');
const lights_toon_pars_fragment = require('./ShaderChunk/lights_toon_pars_fragment.glsl.js');
const lights_phong_fragment = require('./ShaderChunk/lights_phong_fragment.glsl.js');
const lights_phong_pars_fragment = require('./ShaderChunk/lights_phong_pars_fragment.glsl.js');
const lights_physical_fragment = require('./ShaderChunk/lights_physical_fragment.glsl.js');
const lights_physical_pars_fragment = require('./ShaderChunk/lights_physical_pars_fragment.glsl.js');
const lights_fragment_begin = require('./ShaderChunk/lights_fragment_begin.glsl.js');
const lights_fragment_maps = require('./ShaderChunk/lights_fragment_maps.glsl.js');
const lights_fragment_end = require('./ShaderChunk/lights_fragment_end.glsl.js');
const logdepthbuf_fragment = require('./ShaderChunk/logdepthbuf_fragment.glsl.js');
const logdepthbuf_pars_fragment = require('./ShaderChunk/logdepthbuf_pars_fragment.glsl.js');
const logdepthbuf_pars_vertex = require('./ShaderChunk/logdepthbuf_pars_vertex.glsl.js');
const logdepthbuf_vertex = require('./ShaderChunk/logdepthbuf_vertex.glsl.js');
const map_fragment = require('./ShaderChunk/map_fragment.glsl.js');
const map_pars_fragment = require('./ShaderChunk/map_pars_fragment.glsl.js');
const map_particle_fragment = require('./ShaderChunk/map_particle_fragment.glsl.js');
const map_particle_pars_fragment = require('./ShaderChunk/map_particle_pars_fragment.glsl.js');
const metalnessmap_fragment = require('./ShaderChunk/metalnessmap_fragment.glsl.js');
const metalnessmap_pars_fragment = require('./ShaderChunk/metalnessmap_pars_fragment.glsl.js');
const morphcolor_vertex = require('./ShaderChunk/morphcolor_vertex.glsl.js');
const morphnormal_vertex = require('./ShaderChunk/morphnormal_vertex.glsl.js');
const morphtarget_pars_vertex = require('./ShaderChunk/morphtarget_pars_vertex.glsl.js');
const morphtarget_vertex = require('./ShaderChunk/morphtarget_vertex.glsl.js');
const normal_fragment_begin = require('./ShaderChunk/normal_fragment_begin.glsl.js');
const normal_fragment_maps = require('./ShaderChunk/normal_fragment_maps.glsl.js');
const normal_pars_fragment = require('./ShaderChunk/normal_pars_fragment.glsl.js');
const normal_pars_vertex = require('./ShaderChunk/normal_pars_vertex.glsl.js');
const normal_vertex = require('./ShaderChunk/normal_vertex.glsl.js');
const normalmap_pars_fragment = require('./ShaderChunk/normalmap_pars_fragment.glsl.js');
const clearcoat_normal_fragment_begin = require('./ShaderChunk/clearcoat_normal_fragment_begin.glsl.js');
const clearcoat_normal_fragment_maps = require('./ShaderChunk/clearcoat_normal_fragment_maps.glsl.js');
const clearcoat_pars_fragment = require('./ShaderChunk/clearcoat_pars_fragment.glsl.js');
const iridescence_pars_fragment = require('./ShaderChunk/iridescence_pars_fragment.glsl.js');
const opaque_fragment = require('./ShaderChunk/opaque_fragment.glsl.js');
const packing = require('./ShaderChunk/packing.glsl.js');
const premultiplied_alpha_fragment = require('./ShaderChunk/premultiplied_alpha_fragment.glsl.js');
const project_vertex = require('./ShaderChunk/project_vertex.glsl.js');
const dithering_fragment = require('./ShaderChunk/dithering_fragment.glsl.js');
const dithering_pars_fragment = require('./ShaderChunk/dithering_pars_fragment.glsl.js');
const roughnessmap_fragment = require('./ShaderChunk/roughnessmap_fragment.glsl.js');
const roughnessmap_pars_fragment = require('./ShaderChunk/roughnessmap_pars_fragment.glsl.js');
const shadowmap_pars_fragment = require('./ShaderChunk/shadowmap_pars_fragment.glsl.js');
const shadowmap_pars_vertex = require('./ShaderChunk/shadowmap_pars_vertex.glsl.js');
const shadowmap_vertex = require('./ShaderChunk/shadowmap_vertex.glsl.js');
const shadowmask_pars_fragment = require('./ShaderChunk/shadowmask_pars_fragment.glsl.js');
const skinbase_vertex = require('./ShaderChunk/skinbase_vertex.glsl.js');
const skinning_pars_vertex = require('./ShaderChunk/skinning_pars_vertex.glsl.js');
const skinning_vertex = require('./ShaderChunk/skinning_vertex.glsl.js');
const skinnormal_vertex = require('./ShaderChunk/skinnormal_vertex.glsl.js');
const specularmap_fragment = require('./ShaderChunk/specularmap_fragment.glsl.js');
const specularmap_pars_fragment = require('./ShaderChunk/specularmap_pars_fragment.glsl.js');
const tonemapping_fragment = require('./ShaderChunk/tonemapping_fragment.glsl.js');
const tonemapping_pars_fragment = require('./ShaderChunk/tonemapping_pars_fragment.glsl.js');
const transmission_fragment = require('./ShaderChunk/transmission_fragment.glsl.js');
const transmission_pars_fragment = require('./ShaderChunk/transmission_pars_fragment.glsl.js');
const uv_pars_fragment = require('./ShaderChunk/uv_pars_fragment.glsl.js');
const uv_pars_vertex = require('./ShaderChunk/uv_pars_vertex.glsl.js');
const uv_vertex = require('./ShaderChunk/uv_vertex.glsl.js');
const worldpos_vertex = require('./ShaderChunk/worldpos_vertex.glsl.js');

const background = require('./ShaderLib/background.glsl.js');
const backgroundCube = require('./ShaderLib/backgroundCube.glsl.js');
const cube = require('./ShaderLib/cube.glsl.js');
const depth = require('./ShaderLib/depth.glsl.js');
const distanceRGBA = require('./ShaderLib/distanceRGBA.glsl.js');
const equirect = require('./ShaderLib/equirect.glsl.js');
const linedashed = require('./ShaderLib/linedashed.glsl.js');
const meshbasic = require('./ShaderLib/meshbasic.glsl.js');
const meshlambert = require('./ShaderLib/meshlambert.glsl.js');
const meshmatcap = require('./ShaderLib/meshmatcap.glsl.js');
const meshnormal = require('./ShaderLib/meshnormal.glsl.js');
const meshphong = require('./ShaderLib/meshphong.glsl.js');
const meshphysical = require('./ShaderLib/meshphysical.glsl.js');
const meshtoon = require('./ShaderLib/meshtoon.glsl.js');
const points = require('./ShaderLib/points.glsl.js');
const shadow = require('./ShaderLib/shadow.glsl.js');
const sprite = require('./ShaderLib/sprite.glsl.js');

module.exports = {
	ShaderChunk: {
		alphahash_fragment: alphahash_fragment,
		alphahash_pars_fragment: alphahash_pars_fragment,
		alphamap_fragment: alphamap_fragment,
		alphamap_pars_fragment: alphamap_pars_fragment,
		alphatest_fragment: alphatest_fragment,
		alphatest_pars_fragment: alphatest_pars_fragment,
		aomap_fragment: aomap_fragment,
		aomap_pars_fragment: aomap_pars_fragment,
		batching_pars_vertex: batching_pars_vertex,
		batching_vertex: batching_vertex,
		begin_vertex: begin_vertex,
		beginnormal_vertex: beginnormal_vertex,
		bsdfs: bsdfs,
		iridescence_fragment: iridescence_fragment,
		bumpmap_pars_fragment: bumpmap_pars_fragment,
		clipping_planes_fragment: clipping_planes_fragment,
		clipping_planes_pars_fragment: clipping_planes_pars_fragment,
		clipping_planes_pars_vertex: clipping_planes_pars_vertex,
		clipping_planes_vertex: clipping_planes_vertex,
		color_fragment: color_fragment,
		color_pars_fragment: color_pars_fragment,
		color_pars_vertex: color_pars_vertex,
		color_vertex: color_vertex,
		common: common,
		cube_uv_reflection_fragment: cube_uv_reflection_fragment,
		defaultnormal_vertex: defaultnormal_vertex,
		displacementmap_pars_vertex: displacementmap_pars_vertex,
		displacementmap_vertex: displacementmap_vertex,
		emissivemap_fragment: emissivemap_fragment,
		emissivemap_pars_fragment: emissivemap_pars_fragment,
		colorspace_fragment: colorspace_fragment,
		colorspace_pars_fragment: colorspace_pars_fragment,
		envmap_fragment: envmap_fragment,
		envmap_common_pars_fragment: envmap_common_pars_fragment,
		envmap_pars_fragment: envmap_pars_fragment,
		envmap_pars_vertex: envmap_pars_vertex,
		envmap_physical_pars_fragment: envmap_physical_pars_fragment,
		envmap_vertex: envmap_vertex,
		fog_vertex: fog_vertex,
		fog_pars_vertex: fog_pars_vertex,
		fog_fragment: fog_fragment,
		fog_pars_fragment: fog_pars_fragment,
		gradientmap_pars_fragment: gradientmap_pars_fragment,
		lightmap_fragment: lightmap_fragment,
		lightmap_pars_fragment: lightmap_pars_fragment,
		lights_lambert_fragment: lights_lambert_fragment,
		lights_lambert_pars_fragment: lights_lambert_pars_fragment,
		lights_pars_begin: lights_pars_begin,
		lights_toon_fragment: lights_toon_fragment,
		lights_toon_pars_fragment: lights_toon_pars_fragment,
		lights_phong_fragment: lights_phong_fragment,
		lights_phong_pars_fragment: lights_phong_pars_fragment,
		lights_physical_fragment: lights_physical_fragment,
		lights_physical_pars_fragment: lights_physical_pars_fragment,
		lights_fragment_begin: lights_fragment_begin,
		lights_fragment_maps: lights_fragment_maps,
		lights_fragment_end: lights_fragment_end,
		logdepthbuf_fragment: logdepthbuf_fragment,
		logdepthbuf_pars_fragment: logdepthbuf_pars_fragment,
		logdepthbuf_pars_vertex: logdepthbuf_pars_vertex,
		logdepthbuf_vertex: logdepthbuf_vertex,
		map_fragment: map_fragment,
		map_pars_fragment: map_pars_fragment,
		map_particle_fragment: map_particle_fragment,
		map_particle_pars_fragment: map_particle_pars_fragment,
		metalnessmap_fragment: metalnessmap_fragment,
		metalnessmap_pars_fragment: metalnessmap_pars_fragment,
		morphcolor_vertex: morphcolor_vertex,
		morphnormal_vertex: morphnormal_vertex,
		morphtarget_pars_vertex: morphtarget_pars_vertex,
		morphtarget_vertex: morphtarget_vertex,
		normal_fragment_begin: normal_fragment_begin,
		normal_fragment_maps: normal_fragment_maps,
		normal_pars_fragment: normal_pars_fragment,
		normal_pars_vertex: normal_pars_vertex,
		normal_vertex: normal_vertex,
		normalmap_pars_fragment: normalmap_pars_fragment,
		clearcoat_normal_fragment_begin: clearcoat_normal_fragment_begin,
		clearcoat_normal_fragment_maps: clearcoat_normal_fragment_maps,
		clearcoat_pars_fragment: clearcoat_pars_fragment,
		iridescence_pars_fragment: iridescence_pars_fragment,
		opaque_fragment: opaque_fragment,
		packing: packing,
		premultiplied_alpha_fragment: premultiplied_alpha_fragment,
		project_vertex: project_vertex,
		dithering_fragment: dithering_fragment,
		dithering_pars_fragment: dithering_pars_fragment,
		roughnessmap_fragment: roughnessmap_fragment,
		roughnessmap_pars_fragment: roughnessmap_pars_fragment,
		shadowmap_pars_fragment: shadowmap_pars_fragment,
		shadowmap_pars_vertex: shadowmap_pars_vertex,
		shadowmap_vertex: shadowmap_vertex,
		shadowmask_pars_fragment: shadowmask_pars_fragment,
		skinbase_vertex: skinbase_vertex,
		skinning_pars_vertex: skinning_pars_vertex,
		skinning_vertex: skinning_vertex,
		skinnormal_vertex: skinnormal_vertex,
		specularmap_fragment: specularmap_fragment,
		specularmap_pars_fragment: specularmap_pars_fragment,
		tonemapping_fragment: tonemapping_fragment,
		tonemapping_pars_fragment: tonemapping_pars_fragment,
		transmission_fragment: transmission_fragment,
		transmission_pars_fragment: transmission_pars_fragment,
		uv_pars_fragment: uv_pars_fragment,
		uv_pars_vertex: uv_pars_vertex,
		uv_vertex: uv_vertex,
		worldpos_vertex: worldpos_vertex,
	
		background_vert: background.vertex,
		background_frag: background.fragment,
		backgroundCube_vert: backgroundCube.vertex,
		backgroundCube_frag: backgroundCube.fragment,
		cube_vert: cube.vertex,
		cube_frag: cube.fragment,
		depth_vert: depth.vertex,
		depth_frag: depth.fragment,
		distanceRGBA_vert: distanceRGBA.vertex,
		distanceRGBA_frag: distanceRGBA.fragment,
		equirect_vert: equirect.vertex,
		equirect_frag: equirect.fragment,
		linedashed_vert: linedashed.vertex,
		linedashed_frag: linedashed.fragment,
		meshbasic_vert: meshbasic.vertex,
		meshbasic_frag: meshbasic.fragment,
		meshlambert_vert: meshlambert.vertex,
		meshlambert_frag: meshlambert.fragment,
		meshmatcap_vert: meshmatcap.vertex,
		meshmatcap_frag: meshmatcap.fragment,
		meshnormal_vert: meshnormal.vertex,
		meshnormal_frag: meshnormal.fragment,
		meshphong_vert: meshphong.vertex,
		meshphong_frag: meshphong.fragment,
		meshphysical_vert: meshphysical.vertex,
		meshphysical_frag: meshphysical.fragment,
		meshtoon_vert: meshtoon.vertex,
		meshtoon_frag: meshtoon.fragment,
		points_vert: points.vertex,
		points_frag: points.fragment,
		shadow_vert: shadow.vertex,
		shadow_frag: shadow.fragment,
		sprite_vert: sprite.vertex,
		sprite_frag: sprite.fragment
	}
};
