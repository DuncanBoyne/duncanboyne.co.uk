import { ShaderMaterial, Color } from 'three';
import { NOISE_GLSL } from './noise';

/**
 * The living core: vertex noise breathes the surface, fresnel rim glow,
 * emissive gold ramping with uEnergy as the visitor approaches.
 */
export function createHeartMaterial() {
	return new ShaderMaterial({
		uniforms: {
			uTime: { value: 0 },
			uEnergy: { value: 0 },
			uCore: { value: new Color('#f4d141') },
			uRim: { value: new Color('#fff6d0') }
		},
		vertexShader: /* glsl */ `
			uniform float uTime;
			uniform float uEnergy;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			varying float vDisp;
			${NOISE_GLSL}

			void main() {
				float pulse = sin(uTime * 2.2) * 0.5 + 0.5;
				float n = fbm(position.xy * 1.6 + uTime * 0.35) + fbm(position.yz * 1.6 - uTime * 0.27);
				float disp = n * (0.12 + uEnergy * 0.22) + pulse * (0.05 + uEnergy * 0.1);
				vec3 p = position + normal * disp;
				vDisp = disp;
				vNormal = normalMatrix * normal;
				vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
				vViewDir = -mvPosition.xyz;
				gl_Position = projectionMatrix * mvPosition;
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uTime;
			uniform float uEnergy;
			uniform vec3 uCore;
			uniform vec3 uRim;
			varying vec3 vNormal;
			varying vec3 vViewDir;
			varying float vDisp;

			void main() {
				vec3 n = normalize(vNormal);
				vec3 v = normalize(vViewDir);
				float fresnel = pow(1.0 - abs(dot(n, v)), 2.0);
				float pulse = sin(uTime * 2.2) * 0.5 + 0.5;

				vec3 col = uCore * (0.85 + vDisp * 2.0 + pulse * 0.35 + uEnergy * 0.6);
				col += uRim * fresnel * (0.6 + uEnergy * 0.8);
				gl_FragColor = vec4(col, 1.0);
			}
		`
	});
}
