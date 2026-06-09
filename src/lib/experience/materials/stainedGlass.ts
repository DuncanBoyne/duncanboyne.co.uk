import { ShaderMaterial, UniformsLib, UniformsUtils, Color } from 'three';
import { NOISE_GLSL, FOG_PARS_VERTEX, FOG_VERTEX, FOG_PARS_FRAGMENT, FOG_FRAGMENT } from './noise';

/**
 * Stained-glass pane: voronoi cells separated by dark lead lines.
 * uHealth 1 = vibrant; falling health desaturates and fractures the pane
 * (cells displace and darken). Unlit — glass is the light source.
 */
export function createStainedGlassMaterial(colors: [string, string, string], health = 1) {
	return new ShaderMaterial({
		fog: true,
		uniforms: UniformsUtils.merge([
			UniformsLib.fog,
			{
				uTime: { value: 0 },
				uHealth: { value: health },
				uColorA: { value: new Color(colors[0]) },
				uColorB: { value: new Color(colors[1]) },
				uColorC: { value: new Color(colors[2]) }
			}
		]),
		vertexShader: /* glsl */ `
			varying vec2 vUv;
			${FOG_PARS_VERTEX}
			void main() {
				vUv = uv;
				vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
				${FOG_VERTEX}
				gl_Position = projectionMatrix * mvPosition;
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uTime;
			uniform float uHealth;
			uniform vec3 uColorA;
			uniform vec3 uColorB;
			uniform vec3 uColorC;
			varying vec2 vUv;
			${FOG_PARS_FRAGMENT}
			${NOISE_GLSL}

			void main() {
				// fracture jitters the cell seeds as health decays
				float fracture = 1.0 - uHealth;
				vec2 cellSpace = vUv * vec2(4.0, 11.0);
				cellSpace += fracture * (hash22(floor(cellSpace)) - 0.5) * 1.4;
				vec2 v = voronoi(cellSpace, 0.9);

				// lead lines between cells
				float lead = smoothstep(0.0, 0.06, v.x);

				// per-cell colour from the window palette
				vec3 glass = uColorA;
				if (v.y > 0.66) glass = uColorB;
				else if (v.y > 0.33) glass = uColorC;

				// inner glow shimmer, brighter towards the top arch
				float shimmer = 0.85 + 0.15 * vnoise(cellSpace * 2.0 + uTime * 0.15);
				float archGlow = 0.7 + 0.5 * vUv.y;
				glass *= shimmer * archGlow * 1.35;

				// dying windows: desaturate, darken, some cells go out entirely
				float grey = dot(glass, vec3(0.299, 0.587, 0.114));
				glass = mix(vec3(grey) * 0.12, glass, uHealth);
				float deadCell = step(v.y, fracture * 0.55);
				glass *= 1.0 - deadCell * 0.9;

				vec3 col = mix(vec3(0.012, 0.012, 0.015), glass, lead);
				gl_FragColor = vec4(col, 1.0);
				${FOG_FRAGMENT}
			}
		`
	});
}
