import { ShaderMaterial, UniformsLib, UniformsUtils, Color } from 'three';
import { NOISE_GLSL, FOG_PARS_VERTEX, FOG_VERTEX, FOG_PARS_FRAGMENT, FOG_FRAGMENT } from './noise';

/**
 * Instanced floor tile material. Per-instance attributes:
 *  - aIntegrity: 0 = fractured, 1 = flawless
 *  - aDelay: stagger for the rise animation
 *  - aSeed: variation
 * Cracks are an fbm mask that widens as integrity falls; gold veins glow
 * inside the cracks. uCrackSpread lets the Hall of Decisions propagate
 * fractures across the whole foundation later.
 */
export function createCrackedStoneMaterial() {
	return new ShaderMaterial({
		fog: true,
		uniforms: UniformsUtils.merge([
			UniformsLib.fog,
			{
				uProgress: { value: 0 },
				uCrackSpread: { value: 0 },
				uTime: { value: 0 },
				uStone: { value: new Color('#43454e') },
				uVein: { value: new Color('#f4d141') }
			}
		]),
		vertexShader: /* glsl */ `
			attribute float aIntegrity;
			attribute float aDelay;
			attribute float aSeed;
			uniform float uProgress;
			varying vec2 vWorldXZ;
			varying float vIntegrity;
			varying float vSeed;
			varying float vTopFace;
			${FOG_PARS_VERTEX}

			void main() {
				float reveal = clamp((uProgress - aDelay * 0.55) / 0.45, 0.0, 1.0);
				// ease-out rise from below
				float rise = 1.0 - pow(1.0 - reveal, 3.0);
				vec3 p = position;
				vec4 instPos = instanceMatrix * vec4(p, 1.0);
				instPos.y -= (1.0 - rise) * 7.0;
				vec4 worldPos = modelMatrix * instPos;
				vWorldXZ = worldPos.xz;
				vIntegrity = aIntegrity;
				vSeed = aSeed;
				vTopFace = step(0.4, normal.y);
				vec4 mvPosition = viewMatrix * worldPos;
				${FOG_VERTEX}
				gl_Position = projectionMatrix * mvPosition;
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uCrackSpread;
			uniform float uTime;
			uniform vec3 uStone;
			uniform vec3 uVein;
			varying vec2 vWorldXZ;
			varying float vIntegrity;
			varying float vSeed;
			varying float vTopFace;
			${FOG_PARS_FRAGMENT}
			${NOISE_GLSL}

			void main() {
				// stone mottling
				float grain = fbm(vWorldXZ * 0.9 + vSeed * 17.0);
				vec3 col = uStone * (0.75 + grain * 0.5);

				// crack mask: ridged fbm. Only genuinely weak tiles fracture;
				// uCrackSpread (a decision's consequence) drags healthy ones down.
				float crackNoise = abs(fbm(vWorldXZ * 0.55 + vSeed * 5.0) - 0.5) * 2.0;
				float weakness = clamp((0.45 - vIntegrity) / 0.45 + uCrackSpread, 0.0, 1.0);
				float crack = smoothstep(0.12 * weakness + 0.015, 0.0, crackNoise) * vTopFace;

				// cracks darken the stone, gold veins breathe inside them
				col = mix(col, vec3(0.01), crack * 0.9);
				float veinPulse = 0.55 + 0.45 * sin(uTime * 0.8 + vSeed * 20.0);
				col += uVein * crack * weakness * veinPulse * 0.9;

				// simple top-down light
				col *= 0.55 + 0.45 * vTopFace;

				gl_FragColor = vec4(col, 1.0);
				${FOG_FRAGMENT}
			}
		`
	});
}
