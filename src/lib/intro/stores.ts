import { writable } from 'svelte/store';

/** True while the chaos-to-clarity intro overlay is running (used to inert the page beneath). */
export const introActive = writable(false);
