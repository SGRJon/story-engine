<script lang="ts">
	import type { StoryAct } from '$lib/content/types';

	let {
		acts,
		currentBeatIndex,
		onJump
	}: {
		acts: StoryAct[];
		currentBeatIndex: number;
		onJump: (beatIndex: number) => void;
	} = $props();

	// An act stays highlighted for every beat inside it, not just its
	// first beat, so this checks whether the current beat falls
	// between this act's start and the next act's start.
	function isActive(act: StoryAct, index: number) {
		const next = acts[index + 1];
		const upperBound = next ? next.startBeat : Infinity;
		return currentBeatIndex >= act.startBeat && currentBeatIndex < upperBound;
	}
</script>

<nav class="chapter-bar" aria-label="Story chapters">
	{#each acts as act, i}
		<button
			type="button"
			class="chapter"
			class:active={isActive(act, i)}
			aria-current={isActive(act, i) ? 'step' : undefined}
			onclick={() => onJump(act.startBeat)}
		>
			{act.label}
		</button>
	{/each}
</nav>

<style>
	.chapter-bar {
		display: flex;
		gap: 34px;
		padding: 16px 0;
	}

	.chapter {
		background: none;
		border: none;
		border-bottom: 2px solid transparent;
		padding: 0 0 6px;
		font-family: var(--font-mono);
		font-size: 0.88rem;
		font-weight: 500;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--ink-2);
		cursor: pointer;
		transition:
			color 0.5s ease,
			border-color 0.5s ease;
	}

	.chapter.active {
		color: var(--accent-deep);
		font-weight: 700;
		border-bottom-color: var(--accent);
	}

	.chapter:hover {
		color: var(--accent);
	}

	.chapter:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: 4px;
		border-radius: 3px;
	}

	@media (max-width: 680px) {
		.chapter-bar {
			gap: 22px;
			padding: 4px 0 10px;
		}

		.chapter {
			font-size: 0.8rem;
			letter-spacing: 0.06em;
		}
	}
</style>
