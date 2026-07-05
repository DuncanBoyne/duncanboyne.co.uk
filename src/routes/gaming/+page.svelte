<script lang="ts">
	import { Gamepad2, Trophy, ChevronDown, ChevronUp } from 'lucide-svelte';
	import Seo from '$lib/components/Seo.svelte';
	import type { GamingAchievement } from '$lib/types';
	import type { PageData } from './$types';

	export let data: PageData;
	$: achievements = data.achievements;

	let expandedGames: Record<string, boolean> = {};

	interface GameGroup {
		game: string;
		achievements: GamingAchievement[];
	}

	$: grouped = achievements.reduce<GameGroup[]>((acc, a) => {
		const existing = acc.find(g => g.game === a.game);
		if (existing) {
			existing.achievements.push(a);
		} else {
			acc.push({ game: a.game, achievements: [a] });
		}
		return acc;
	}, []);

	const rankTiers: Record<string, number> = {
		'Iron': 0, 'Bronze': 1, 'Silver': 2, 'Gold': 3,
		'Platinum': 4, 'Emerald': 5, 'Diamond': 6,
		'Master': 7, 'Grandmaster': 8, 'Challenger': 9
	};
	const divisionValues: Record<string, number> = { 'IV': 0, 'III': 1, 'II': 2, 'I': 3 };

	function rankScore(value: string): number {
		const parts = value.split(' ');
		if (parts[0] === 'Unranked') return -1;
		const tier = rankTiers[parts[0]] ?? -1;
		const div = divisionValues[parts[1]] ?? 0;
		const lp = parseInt(parts[2]) || 0;
		return tier * 1000 + div * 100 + lp;
	}

	function getPeak(achievements: GamingAchievement[]): { rank: string; season: string } | null {
		let best: GamingAchievement | null = null;
		let bestScore = -1;
		for (const a of achievements) {
			const score = rankScore(a.value);
			if (score > bestScore) {
				bestScore = score;
				best = a;
			}
		}
		if (!best || bestScore < 0) return null;
		return { rank: best.value, season: best.season || '' };
	}

	function parseNotes(notes: string | null) {
		if (!notes) return { games: null, top4: null, wins: null };
		const gamesMatch = notes.match(/Games:\s*(\d+)/);
		const top4Match = notes.match(/Top4:\s*\d+\s*\(([^)]+)\)/);
		const winsMatch = notes.match(/Wins:\s*(\d+)/);
		return {
			games: gamesMatch ? parseInt(gamesMatch[1]) : null,
			top4: top4Match ? top4Match[1] : null,
			wins: winsMatch ? parseInt(winsMatch[1]) : null
		};
	}

	function toggleGame(game: string) {
		expandedGames[game] = !expandedGames[game];
		expandedGames = expandedGames;
	}

	function visibleAchievements(group: GameGroup): GamingAchievement[] {
		if (expandedGames[group.game]) return group.achievements;
		return group.achievements.slice(0, 3);
	}

</script>

<Seo
	title="Gaming Achievements — Duncan Boyne"
	description="Gaming achievements, peak ratings, and milestones from Duncan Boyne."
	path="/gaming"
/>

<section class="py-16">
	<div class="container-custom">
		<div class="text-center mb-12">
			<h1 class="text-4xl md:text-5xl font-bold text-text mb-4">Gaming Achievements</h1>
			<p class="text-lg text-muted max-w-2xl mx-auto">
				Peak ratings, ranks, and milestones from the games I play.
			</p>
		</div>

		{#if achievements.length === 0}
			<div class="text-center py-12 bg-surface rounded-xl border border-border">
				<Gamepad2 class="w-12 h-12 text-accent/30 mx-auto mb-4" aria-hidden="true" />
				<p class="text-muted">No gaming achievements yet.</p>
				<p class="text-muted/70 text-sm mt-2">Check back soon!</p>
			</div>
		{:else}
			<div class="space-y-10">
				{#each grouped as group}
					{@const peak = getPeak(group.achievements)}
					<div>
						<div class="flex flex-wrap items-center gap-3 mb-4">
							<Gamepad2 class="w-5 h-5 text-accent" aria-hidden="true" />
							<h2 class="text-xl font-bold text-text">{group.game}</h2>
							<span class="text-xs font-medium px-2 py-1 rounded-full bg-accent/10 text-accent">
								{group.achievements.length} {group.achievements.length === 1 ? 'set' : 'sets'}
							</span>
							{#if peak}
								<span class="text-sm text-muted">
									Peak: <span class="font-semibold text-accent">{peak.rank}</span>
									<span class="text-muted/70">({peak.season})</span>
								</span>
							{/if}
						</div>

						<div class="bg-surface rounded-xl border border-border overflow-hidden">
							<table class="w-full">
								<thead class="hidden sm:table-header-group">
									<tr class="bg-border/30 text-xs font-semibold text-muted uppercase tracking-wide">
										<th class="px-5 py-3 text-left" scope="col">Set</th>
										<th class="px-5 py-3 text-left" scope="col">Games</th>
										<th class="px-5 py-3 text-left" scope="col">Top 4%</th>
										<th class="px-5 py-3 text-left" scope="col">Wins</th>
										<th class="px-5 py-3 text-left" scope="col">Final Rank</th>
									</tr>
								</thead>
								<tbody>
									{#each (expandedGames[group.game] ? group.achievements : group.achievements.slice(0, 3)) as achievement, i}
										{@const stats = parseNotes(achievement.notes)}
										<tr class="{i > 0 ? 'border-t border-border' : ''} hover:bg-accent/5 transition-colors">
											<td class="px-5 py-4 font-semibold text-text text-sm">{achievement.season || '-'}</td>
											<td class="px-5 py-4 text-sm">
												{#if stats.games != null}
													<span class="text-text">{stats.games}</span>
												{:else}
													<span class="text-muted/50">-</span>
												{/if}
											</td>
											<td class="px-5 py-4 text-sm">
												{#if stats.top4}
													<span class="text-text">{stats.top4}</span>
												{:else}
													<span class="text-muted/50">-</span>
												{/if}
											</td>
											<td class="px-5 py-4 text-sm">
												{#if stats.wins != null}
													<span class="text-text">{stats.wins}</span>
												{:else}
													<span class="text-muted/50">-</span>
												{/if}
											</td>
											<td class="px-5 py-4 text-sm font-bold text-accent">{achievement.value}</td>
										</tr>
									{/each}
								</tbody>
							</table>

							<!-- Show more / Show less -->
							{#if group.achievements.length > 3}
								<button
									on:click={() => toggleGame(group.game)}
									class="w-full px-5 py-3 border-t border-border text-sm font-medium text-accent hover:bg-accent/5 transition-colors flex items-center justify-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
									aria-expanded={expandedGames[group.game] || false}
								>
									{#if expandedGames[group.game]}
										Show less
										<ChevronUp class="w-4 h-4" aria-hidden="true" />
									{:else}
										Show {group.achievements.length - 3} more
										<ChevronDown class="w-4 h-4" aria-hidden="true" />
									{/if}
								</button>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
