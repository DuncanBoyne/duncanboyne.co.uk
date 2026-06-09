<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Text } from '@threlte/extras';
	import type { Group } from 'three';

	function rand(seed: number): number {
		const x = Math.sin(seed * 91.17 + 47.13) * 24634.6345;
		return x - Math.floor(x);
	}

	// Shelves of books receding into fog on both sides of the aisle.
	type Book = { x: number; y: number; z: number; h: number; shade: string };
	const shades = ['#4a3d2e', '#33383f', '#473038', '#3c4435', '#52472f'];
	const books: Book[] = [];
	let n = 0;
	for (let side = -1; side <= 1; side += 2) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 14; col++) {
				n++;
				books.push({
					x: side * (7 + rand(n) * 1.2),
					y: 4 + row * 3 + rand(n * 1.7) * 0.4,
					z: -14 - col * 1.1,
					h: 1 + rand(n * 2.3) * 0.5,
					shade: shades[n % shades.length]
				});
			}
		}
	}

	// Clues drifting between the shelves — never explained.
	const words = [
		'Data', 'Analytics', 'Power BI', 'AI', 'Transformation',
		'Leadership', 'Community', 'Speaking', 'Mentoring'
	].map((text, i) => ({
		text,
		x: (rand(i * 7.7) - 0.5) * 9,
		y: 5 + rand(i * 3.1) * 8,
		z: -15 - rand(i * 5.3) * 14,
		speed: 0.4 + rand(i * 9.1) * 0.5
	}));

	let wordsGroup = $state<Group>();
	let t = 0;
	useTask((delta) => {
		t += delta;
		if (!wordsGroup) return;
		wordsGroup.children.forEach((child, i) => {
			child.position.y = words[i].y + Math.sin(t * words[i].speed + i * 2.4) * 0.5;
		});
	});
</script>

<T.Group>
	{#each books as book}
		<T.Mesh position={[book.x, book.y, book.z]}>
			<T.BoxGeometry args={[0.55, book.h, 0.28]} />
			<T.MeshStandardMaterial color={book.shade} roughness={0.85} />
		</T.Mesh>
	{/each}

	<T.Group bind:ref={wordsGroup}>
		{#each words as word}
			<T.Group position={[word.x, word.y, word.z]}>
				<Text
					text={word.text}
					fontSize={0.42}
					color="#f4d141"
					fillOpacity={0.55}
					anchorX="center"
					anchorY="middle"
				/>
			</T.Group>
		{/each}
	</T.Group>
</T.Group>
