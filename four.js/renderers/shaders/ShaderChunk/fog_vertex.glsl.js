module.exports = /* glsl */`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;
