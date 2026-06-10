import {
	AdditiveBlending,
	BufferAttribute,
	BufferGeometry,
	Points,
	ShaderMaterial
} from 'three';

function rand(seed: number): number {
	const x = Math.sin(seed * 137.31 + 91.7) * 43758.5453;
	return x - Math.floor(x);
}

/**
 * The dissolve: points sampled from the cathedral's parametric surfaces.
 * As uPhase rises (the reveal), stone sheds particles that spiral upward
 * and become light — "stone becomes particles, particles become data".
 */
export function createDissolveSystem(count = 24000): Points {
	const positions = new Float32Array(count * 3);
	const seeds = new Float32Array(count);

	let n = 0;
	const put = (x: number, y: number, z: number) => {
		positions[n * 3] = x;
		positions[n * 3 + 1] = y;
		positions[n * 3 + 2] = z;
		seeds[n] = rand(n * 1.618);
		n++;
	};

	while (n < count) {
		const r = rand(n * 3.77);
		if (r < 0.38) {
			// the floor
			put((rand(n * 1.1) - 0.5) * 44, rand(n * 1.7) * 0.4, (rand(n * 2.3) - 0.5) * 105);
		} else if (r < 0.64) {
			// the colonnades
			const side = rand(n * 4.1) > 0.5 ? 9 : -9;
			const row = Math.floor(rand(n * 5.3) * 8);
			const ang = rand(n * 6.7) * Math.PI * 2;
			const rad = 1.05 + rand(n * 7.9) * 0.5;
			put(side + Math.cos(ang) * rad, rand(n * 8.3) * 40, 30 - row * 8.5 + Math.sin(ang) * rad);
		} else if (r < 0.8) {
			// the windows
			const side = rand(n * 9.1) > 0.5 ? 15.5 : -15.5;
			const i = Math.floor(rand(n * 10.3) * 6);
			put(side, 6.5 + rand(n * 11.7) * 15, 26 - i * 11 + (rand(n * 12.9) - 0.5) * 4.2);
		} else if (r < 0.92) {
			// shelves and towers
			const side = rand(n * 13.1) > 0.5 ? 1 : -1;
			put(side * (7 + rand(n * 14.3) * 12), rand(n * 15.7) * 18, -10 - rand(n * 16.9) * 18);
		} else {
			// the heart's shell
			const theta = rand(n * 17.1) * Math.PI * 2;
			const phi = Math.acos(2 * rand(n * 18.3) - 1);
			const rad = 2.2 + rand(n * 19.7) * 0.3;
			put(
				Math.sin(phi) * Math.cos(theta) * rad,
				10 + Math.cos(phi) * rad,
				-38 + Math.sin(phi) * Math.sin(theta) * rad
			);
		}
	}

	const geometry = new BufferGeometry();
	geometry.setAttribute('position', new BufferAttribute(positions, 3));
	geometry.setAttribute('aSeed', new BufferAttribute(seeds, 1));

	const material = new ShaderMaterial({
		transparent: true,
		blending: AdditiveBlending,
		depthWrite: false,
		uniforms: {
			uPhase: { value: 0 },
			uTime: { value: 0 }
		},
		vertexShader: /* glsl */ `
			attribute float aSeed;
			uniform float uPhase;
			uniform float uTime;
			varying float vAlpha;
			varying float vHeat;

			void main() {
				// each particle lets go at its own moment
				float local = smoothstep(aSeed * 0.7, aSeed * 0.7 + 0.2, uPhase);

				float ang = aSeed * 6.2831 + uTime * 0.25 + local * 2.4;
				float radius = local * (2.0 + aSeed * 7.0);
				vec3 p = position;
				p.x += sin(ang) * radius;
				p.z += cos(ang) * radius;
				p.y += local * (6.0 + aSeed * 34.0);

				vAlpha = local * (1.0 - smoothstep(0.85, 1.0, local * (0.6 + aSeed * 0.4)));
				vHeat = local;

				vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
				gl_PointSize = (1.4 + aSeed * 2.2) * (260.0 / max(1.0, -mvPosition.z));
				gl_Position = projectionMatrix * mvPosition;
			}
		`,
		fragmentShader: /* glsl */ `
			varying float vAlpha;
			varying float vHeat;

			void main() {
				vec2 c = gl_PointCoord - 0.5;
				float d = smoothstep(0.5, 0.05, length(c));
				vec3 gold = vec3(0.957, 0.82, 0.255);
				vec3 white = vec3(1.0, 0.97, 0.85);
				vec3 col = mix(gold, white, vHeat * 0.7);
				gl_FragColor = vec4(col, d * vAlpha * 0.85);
			}
		`
	});

	const points = new Points(geometry, material);
	points.frustumCulled = false;
	return points;
}
