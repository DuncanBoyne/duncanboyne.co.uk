// Shared GLSL noise snippets, prepended to shader source strings.

export const NOISE_GLSL = /* glsl */ `
float hash12(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * 0.1031);
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
	vec3 p3 = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
	p3 += dot(p3, p3.yzx + 33.33);
	return fract((p3.xx + p3.yz) * p3.zy);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	vec2 u = f * f * (3.0 - 2.0 * f);
	return mix(
		mix(hash12(i), hash12(i + vec2(1.0, 0.0)), u.x),
		mix(hash12(i + vec2(0.0, 1.0)), hash12(i + vec2(1.0, 1.0)), u.x),
		u.y
	);
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 4; i++) {
		v += a * vnoise(p);
		p = p * 2.07 + vec2(13.7, 7.1);
		a *= 0.5;
	}
	return v;
}

// Returns distance to nearest voronoi border (x) and a cell id hash (y).
vec2 voronoi(vec2 p, float jitter) {
	vec2 n = floor(p);
	vec2 f = fract(p);
	float borderDist = 8.0;
	float cellId = 0.0;
	vec2 closestOffset = vec2(0.0);
	float minDist = 8.0;
	for (int j = -1; j <= 1; j++) {
		for (int i = -1; i <= 1; i++) {
			vec2 g = vec2(float(i), float(j));
			vec2 o = hash22(n + g) * jitter;
			vec2 r = g + o - f;
			float d = dot(r, r);
			if (d < minDist) {
				minDist = d;
				closestOffset = r;
				cellId = hash12(n + g);
			}
		}
	}
	for (int j = -1; j <= 1; j++) {
		for (int i = -1; i <= 1; i++) {
			vec2 g = vec2(float(i), float(j));
			vec2 o = hash22(n + g) * jitter;
			vec2 r = g + o - f;
			if (dot(closestOffset - r, closestOffset - r) > 0.0001) {
				borderDist = min(borderDist, dot(0.5 * (closestOffset + r), normalize(r - closestOffset)));
			}
		}
	}
	return vec2(borderDist, cellId);
}
`;

export const FOG_PARS_VERTEX = /* glsl */ `
varying float vFogDepth;
`;

export const FOG_VERTEX = /* glsl */ `
vFogDepth = -mvPosition.z;
`;

export const FOG_PARS_FRAGMENT = /* glsl */ `
uniform vec3 fogColor;
uniform float fogDensity;
varying float vFogDepth;
`;

export const FOG_FRAGMENT = /* glsl */ `
float fogFactor = 1.0 - exp(-fogDensity * fogDensity * vFogDepth * vFogDepth);
gl_FragColor.rgb = mix(gl_FragColor.rgb, fogColor, fogFactor);
`;
