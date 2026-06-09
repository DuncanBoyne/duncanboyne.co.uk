import { ShaderMaterial, AdditiveBlending, Color, DoubleSide } from 'three';
import { NOISE_GLSL } from './noise';

/** Soft additive light shaft plane — fades along its length and edges. */
export function createLightShaftMaterial(color: string, strength = 0.16) {
	return new ShaderMaterial({
		transparent: true,
		blending: AdditiveBlending,
		depthWrite: false,
		side: DoubleSide,
		uniforms: {
			uTime: { value: 0 },
			uColor: { value: new Color(color) },
			uStrength: { value: strength }
		},
		vertexShader: /* glsl */ `
			varying vec2 vUv;
			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
			}
		`,
		fragmentShader: /* glsl */ `
			uniform float uTime;
			uniform vec3 uColor;
			uniform float uStrength;
			varying vec2 vUv;
			${NOISE_GLSL}

			void main() {
				float edge = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
				float fall = smoothstep(0.0, 0.25, vUv.y) * (1.0 - vUv.y * 0.55);
				float dust = 0.75 + 0.25 * vnoise(vUv * vec2(3.0, 9.0) + uTime * 0.08);
				gl_FragColor = vec4(uColor, edge * fall * dust * uStrength);
			}
		`
	});
}

/** Radial glow texture for additive sprites, generated on the fly. */
export function createGlowCanvas(size = 256): HTMLCanvasElement {
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	const ctx = canvas.getContext('2d')!;
	const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
	g.addColorStop(0, 'rgba(255, 244, 200, 1)');
	g.addColorStop(0.25, 'rgba(244, 209, 65, 0.55)');
	g.addColorStop(0.6, 'rgba(244, 209, 65, 0.12)');
	g.addColorStop(1, 'rgba(244, 209, 65, 0)');
	ctx.fillStyle = g;
	ctx.fillRect(0, 0, size, size);
	return canvas;
}
