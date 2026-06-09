import { decisions } from './stores';

// The four choices in the Hall of Decisions. Each is one-way; its
// consequence is implemented by the section that owns the affected
// geometry, reacting to the decisions store.
export type Decision = {
	id: string;
	label: string;
	position: [number, number, number];
	consequence: string;
};

export const DECISIONS: Decision[] = [
	{
		id: 'invest-automation',
		label: 'Invest in automation',
		position: [-4.5, 9.5, -12],
		consequence: 'New towers rise at the edges of the structure.'
	},
	{
		id: 'ignore-reporting',
		label: 'Ignore reporting',
		position: [4, 7.5, -14],
		consequence: 'Cracks spread across the foundations.'
	},
	{
		id: 'delay-transformation',
		label: 'Delay transformation',
		position: [-3, 6.5, -17],
		consequence: 'A window dies; its light goes out.'
	},
	{
		id: 'trust-the-data',
		label: 'Trust the data',
		position: [4.5, 10.5, -19],
		consequence: 'The heart of the structure burns brighter.'
	}
];

export function chooseDecision(id: string): void {
	decisions.update((d) => (d[id] ? d : { ...d, [id]: true }));
}
