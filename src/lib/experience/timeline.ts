import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { scrollProgress } from './stores';

/**
 * Drives the master scrollProgress store from the overlay's own scroller.
 * One ScrollTrigger, one tween — everything else derives from the store.
 */
export function createScrollTimeline(scroller: HTMLElement, trigger: HTMLElement): () => void {
	gsap.registerPlugin(ScrollTrigger);

	const state = { p: 0 };
	const st = ScrollTrigger.create({
		trigger,
		scroller,
		start: 'top top',
		end: 'bottom bottom',
		scrub: 0.6,
		animation: gsap.to(state, {
			p: 1,
			ease: 'none',
			duration: 1,
			paused: true,
			onUpdate: () => scrollProgress.set(state.p)
		})
	});

	// The scroller has only just become scrollable (overflow toggles on start).
	requestAnimationFrame(() => ScrollTrigger.refresh());

	return () => {
		st.kill();
		scrollProgress.set(0);
	};
}
