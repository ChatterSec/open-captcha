const { REVISION } = require('./constants.js');

const { WebGLArrayRenderTarget } = require('./renderers/WebGLArrayRenderTarget.js');
const { WebGL3DRenderTarget } = require('./renderers/WebGL3DRenderTarget.js');
const { WebGLMultipleRenderTargets } = require('./renderers/WebGLMultipleRenderTargets.js');
const { WebGLCubeRenderTarget } = require('./renderers/WebGLCubeRenderTarget.js');
const { WebGLRenderTarget } = require('./renderers/WebGLRenderTarget.js');
const { WebGLRenderer } = require('./renderers/WebGLRenderer.js');
const { WebGL1Renderer } = require('./renderers/WebGL1Renderer.js');
const { ShaderLib } = require('./renderers/shaders/ShaderLib.js');
const { UniformsLib } = require('./renderers/shaders/UniformsLib.js');
const { UniformsUtils } = require('./renderers/shaders/UniformsUtils.js');
const { ShaderChunk } = require('./renderers/shaders/ShaderChunk.js');
const { FogExp2 } = require('./scenes/FogExp2.js');
const { Fog } = require('./scenes/Fog.js');
const { Scene } = require('./scenes/Scene.js');
const { Sprite } = require('./objects/Sprite.js');
const { LOD } = require('./objects/LOD.js');
const { SkinnedMesh } = require('./objects/SkinnedMesh.js');
const { Skeleton } = require('./objects/Skeleton.js');
const { Bone } = require('./objects/Bone.js');
const { Mesh } = require('./objects/Mesh.js');
const { InstancedMesh } = require('./objects/InstancedMesh.js');
const { BatchedMesh } = require('./objects/BatchedMesh.js');
const { LineSegments } = require('./objects/LineSegments.js');
const { LineLoop } = require('./objects/LineLoop.js');
const { Line } = require('./objects/Line.js');
const { Points } = require('./objects/Points.js');
const { Group } = require('./objects/Group.js');
const { VideoTexture } = require('./textures/VideoTexture.js');
const { FramebufferTexture } = require('./textures/FramebufferTexture.js');
const { Source } = require('./textures/Source.js');
const { DataTexture } = require('./textures/DataTexture.js');
const { DataArrayTexture } = require('./textures/DataArrayTexture.js');
const { Data3DTexture } = require('./textures/Data3DTexture.js');
const { CompressedTexture } = require('./textures/CompressedTexture.js');
const { CompressedArrayTexture } = require('./textures/CompressedArrayTexture.js');
const { CompressedCubeTexture } = require('./textures/CompressedCubeTexture.js');
const { CubeTexture } = require('./textures/CubeTexture.js');
const { CanvasTexture } = require('./textures/CanvasTexture.js');
const { DepthTexture } = require('./textures/DepthTexture.js');
const { Texture } = require('./textures/Texture.js');
const { AnimationLoader } = require('./loaders/AnimationLoader.js');
const { CompressedTextureLoader } = require('./loaders/CompressedTextureLoader.js');
const { CubeTextureLoader } = require('./loaders/CubeTextureLoader.js');
const { DataTextureLoader } = require('./loaders/DataTextureLoader.js');
const { TextureLoader } = require('./loaders/TextureLoader.js');
const { ObjectLoader } = require('./loaders/ObjectLoader.js');
const { MaterialLoader } = require('./loaders/MaterialLoader.js');
const { BufferGeometryLoader } = require('./loaders/BufferGeometryLoader.js');
const { DefaultLoadingManager, LoadingManager } = require('./loaders/LoadingManager.js');
const { ImageLoader } = require('./loaders/ImageLoader.js');
const { ImageBitmapLoader } = require('./loaders/ImageBitmapLoader.js');
const { FileLoader } = require('./loaders/FileLoader.js');
const { Loader } = require('./loaders/Loader.js');
const { LoaderUtils } = require('./loaders/LoaderUtils.js');
const { Cache } = require('./loaders/Cache.js');
const { AudioLoader } = require('./loaders/AudioLoader.js');
const { SpotLight } = require('./lights/SpotLight.js');
const { PointLight } = require('./lights/PointLight.js');
const { RectAreaLight } = require('./lights/RectAreaLight.js');
const { HemisphereLight } = require('./lights/HemisphereLight.js');
const { DirectionalLight } = require('./lights/DirectionalLight.js');
const { AmbientLight } = require('./lights/AmbientLight.js');
const { Light } = require('./lights/Light.js');
const { LightProbe } = require('./lights/LightProbe.js');
const { StereoCamera } = require('./cameras/StereoCamera.js');
const { PerspectiveCamera } = require('./cameras/PerspectiveCamera.js');
const { OrthographicCamera } = require('./cameras/OrthographicCamera.js');
const { CubeCamera } = require('./cameras/CubeCamera.js');
const { ArrayCamera } = require('./cameras/ArrayCamera.js');
const { Camera } = require('./cameras/Camera.js');
const { AudioListener } = require('./audio/AudioListener.js');
const { PositionalAudio } = require('./audio/PositionalAudio.js');
const { AudioContext } = require('./audio/AudioContext.js');
const { AudioAnalyser } = require('./audio/AudioAnalyser.js');
const { Audio } = require('./audio/Audio.js');
const { VectorKeyframeTrack } = require('./animation/tracks/VectorKeyframeTrack.js');
const { StringKeyframeTrack } = require('./animation/tracks/StringKeyframeTrack.js');
const { QuaternionKeyframeTrack } = require('./animation/tracks/QuaternionKeyframeTrack.js');
const { NumberKeyframeTrack } = require('./animation/tracks/NumberKeyframeTrack.js');
const { ColorKeyframeTrack } = require('./animation/tracks/ColorKeyframeTrack.js');
const { BooleanKeyframeTrack } = require('./animation/tracks/BooleanKeyframeTrack.js');
const { PropertyMixer } = require('./animation/PropertyMixer.js');
const { PropertyBinding } = require('./animation/PropertyBinding.js');
const { KeyframeTrack } = require('./animation/KeyframeTrack.js');
const { AnimationUtils } = require('./animation/AnimationUtils.js');
const { AnimationObjectGroup } = require('./animation/AnimationObjectGroup.js');
const { AnimationMixer } = require('./animation/AnimationMixer.js');
const { AnimationClip } = require('./animation/AnimationClip.js');
const { AnimationAction } = require('./animation/AnimationAction.js');
const { RenderTarget } = require('./core/RenderTarget.js');
const { Uniform } = require('./core/Uniform.js');
const { UniformsGroup } = require('./core/UniformsGroup.js');
const { InstancedBufferGeometry } = require('./core/InstancedBufferGeometry.js');
const { BufferGeometry } = require('./core/BufferGeometry.js');
const { InterleavedBufferAttribute } = require('./core/InterleavedBufferAttribute.js');
const { InstancedInterleavedBuffer } = require('./core/InstancedInterleavedBuffer.js');
const { InterleavedBuffer } = require('./core/InterleavedBuffer.js');
const { InstancedBufferAttribute } = require('./core/InstancedBufferAttribute.js');
const { GLBufferAttribute } = require('./core/GLBufferAttribute.js');
const { Object3D } = require('./core/Object3D.js');
const { Raycaster } = require('./core/Raycaster.js');
const { Layers } = require('./core/Layers.js');
const { EventDispatcher } = require('./core/EventDispatcher.js');
const { Clock } = require('./core/Clock.js');
const { QuaternionLinearInterpolant } = require('./math/interpolants/QuaternionLinearInterpolant.js');
const { LinearInterpolant } = require('./math/interpolants/LinearInterpolant.js');
const { DiscreteInterpolant } = require('./math/interpolants/DiscreteInterpolant.js');
const { CubicInterpolant } = require('./math/interpolants/CubicInterpolant.js');
const { Interpolant } = require('./math/Interpolant.js');
const { Triangle } = require('./math/Triangle.js');
const { MathUtils } = require('./math/MathUtils.js');
const { Spherical } = require('./math/Spherical.js');
const { Cylindrical } = require('./math/Cylindrical.js');
const { Plane } = require('./math/Plane.js');
const { Frustum } = require('./math/Frustum.js');
const { Sphere } = require('./math/Sphere.js');
const { Ray } = require('./math/Ray.js');
const { Matrix4 } = require('./math/Matrix4.js');
const { Matrix3 } = require('./math/Matrix3.js');
const { Box3 } = require('./math/Box3.js');
const { Box2 } = require('./math/Box2.js');
const { Line3 } = require('./math/Line3.js');
const { Euler } = require('./math/Euler.js');
const { Vector4 } = require('./math/Vector4.js');
const { Vector3 } = require('./math/Vector3.js');
const { Vector2 } = require('./math/Vector2.js');
const { Quaternion } = require('./math/Quaternion.js');
const { Color } = require('./math/Color.js');
const { ColorManagement } = require('./math/ColorManagement.js');
const { SphericalHarmonics3 } = require('./math/SphericalHarmonics3.js');
const { SpotLightHelper } = require('./helpers/SpotLightHelper.js');
const { SkeletonHelper } = require('./helpers/SkeletonHelper.js');
const { PointLightHelper } = require('./helpers/PointLightHelper.js');
const { HemisphereLightHelper } = require('./helpers/HemisphereLightHelper.js');
const { GridHelper } = require('./helpers/GridHelper.js');
const { PolarGridHelper } = require('./helpers/PolarGridHelper.js');
const { DirectionalLightHelper } = require('./helpers/DirectionalLightHelper.js');
const { CameraHelper } = require('./helpers/CameraHelper.js');
const { BoxHelper } = require('./helpers/BoxHelper.js');
const { Box3Helper } = require('./helpers/Box3Helper.js');
const { PlaneHelper } = require('./helpers/PlaneHelper.js');
const { ArrowHelper } = require('./helpers/ArrowHelper.js');
const { AxesHelper } = require('./helpers/AxesHelper.js');
const Curves = require('./extras/curves/Curves.js');
const { Shape } = require('./extras/core/Shape.js');
const { Path } = require('./extras/core/Path.js');
const { ShapePath } = require('./extras/core/ShapePath.js');
const { CurvePath } = require('./extras/core/CurvePath.js');
const { Curve } = require('./extras/core/Curve.js');
const { DataUtils } = require('./extras/DataUtils.js');
const { ImageUtils } = require('./extras/ImageUtils.js');
const { ShapeUtils } = require('./extras/ShapeUtils.js');
const { PMREMGenerator } = require('./extras/PMREMGenerator.js');
const { WebGLUtils } = require('./renderers/webgl/WebGLUtils.js');
const { createCanvasElement } = require('./utils.js');

module.exports = {
	...require('./constants.js'),
	...require('./core/BufferAttribute.js'),
	...require('./geometries/Geometries.js'),
	...require('./materials/Materials.js'),
	WebGLArrayRenderTarget,
	WebGL3DRenderTarget,
	WebGLMultipleRenderTargets,
	WebGLCubeRenderTarget,
	WebGLRenderTarget,
	WebGLRenderer,
	WebGL1Renderer,
	ShaderLib,
	UniformsLib,
	UniformsUtils,
	ShaderChunk,
	FogExp2,
	Fog,
	Scene,
	Sprite,
	LOD,
	SkinnedMesh,
	Skeleton,
	Bone,
	Mesh,
	InstancedMesh,
	BatchedMesh,
	LineSegments,
	LineLoop,
	Line,
	Points,
	Group,
	VideoTexture,
	FramebufferTexture,
	Source,
	DataTexture,
	DataArrayTexture,
	Data3DTexture,
	CompressedTexture,
	CompressedArrayTexture,
	CompressedCubeTexture,
	CubeTexture,
	CanvasTexture,
	DepthTexture,
	Texture,
	AnimationLoader,
	CompressedTextureLoader,
	CubeTextureLoader,
	DataTextureLoader,
	TextureLoader,
	ObjectLoader,
	MaterialLoader,
	BufferGeometryLoader,
	DefaultLoadingManager,
	LoadingManager,
	ImageLoader,
	ImageBitmapLoader,
	FileLoader,
	Loader,
	LoaderUtils,
	Cache,
	AudioLoader,
	SpotLight,
	PointLight,
	RectAreaLight,
	HemisphereLight,
	DirectionalLight,
	AmbientLight,
	Light,
	LightProbe,
	StereoCamera,
	PerspectiveCamera,
	OrthographicCamera,
	CubeCamera,
	ArrayCamera,
	Camera,
	AudioListener,
	PositionalAudio,
	AudioContext,
	AudioAnalyser,
	Audio,
	VectorKeyframeTrack,
	StringKeyframeTrack,
	QuaternionKeyframeTrack,
	NumberKeyframeTrack,
	ColorKeyframeTrack,
	BooleanKeyframeTrack,
	PropertyMixer,
	PropertyBinding,
	KeyframeTrack,
	AnimationUtils,
	AnimationObjectGroup,
	AnimationMixer,
	AnimationClip,
	AnimationAction,
	RenderTarget,
	Uniform,
	UniformsGroup,
	InstancedBufferGeometry,
	BufferGeometry,
	InterleavedBufferAttribute,
	InstancedInterleavedBuffer,
	InterleavedBuffer,
	InstancedBufferAttribute,
	GLBufferAttribute,
	Object3D,
	Raycaster,
	Layers,
	EventDispatcher,
	Clock,
	QuaternionLinearInterpolant,
	LinearInterpolant,
	DiscreteInterpolant,
	CubicInterpolant,
	Interpolant,
	Triangle,
	MathUtils,
	Spherical,
	Cylindrical,
	Plane,
	Frustum,
	Sphere,
	Ray,
	Matrix4,
	Matrix3,
	Box3,
	Box2,
	Line3,
	Euler,
	Vector4,
	Vector3,
	Vector2,
	Quaternion,
	Color,
	ColorManagement,
	SphericalHarmonics3,
	SpotLightHelper,
	SkeletonHelper,
	PointLightHelper,
	HemisphereLightHelper,
	GridHelper,
	PolarGridHelper,
	DirectionalLightHelper,
	CameraHelper,
	BoxHelper,
	Box3Helper,
	PlaneHelper,
	ArrowHelper,
	AxesHelper,
	Curves,
	Shape,
	Path,
	ShapePath,
	CurvePath,
	Curve,
	DataUtils,
	ImageUtils,
	ShapeUtils,
	PMREMGenerator,
	WebGLUtils,
	createCanvasElement,
}