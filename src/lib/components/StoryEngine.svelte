<script lang="ts">
	import { browser } from '$app/environment';
	import { fade, fly, slide } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import type { Story } from '$lib/content/types';
	import BlockRenderer from './BlockRenderer.svelte';
	import ChapterBar from './ChapterBar.svelte';

	// The theme CSS itself is loaded by whichever route renders this
	// story, not by the engine. This component only ever applies the
	// class name, so a second story with a second theme file works
	// without touching this file.
	let { story }: { story: Story } = $props();

	let currentBeatIndex = $state(1);
	let deeperExpanded = $state(false);
	let reducedMotion = $state(false);
	// +1 when moving forward, -1 when going back, so beats enter from
	// the side they narratively come from.
	let direction = $state(1);

	let currentBeat = $derived(story.beats.find((b) => b.index === currentBeatIndex)!);
	let revealBeatIndex = $derived(
		story.beats.find((b) => b.revealsChapterBar)?.index ?? Infinity
	);
	let chromeVisible = $derived(currentBeatIndex >= revealBeatIndex);
	let progress = $derived((currentBeatIndex / story.beats.length) * 100);

	// The act drives the stage's whole mood: the Engine act goes dark,
	// the cold open moves slower and quieter, the close gets its
	// finale glow. Everything else follows from theme variables.
	let actClass = $derived(
		currentBeat.act === 'engine'
			? 'act-dark'
			: currentBeat.act === 'cold-open'
				? 'act-cold'
				: currentBeat.act === 'close'
					? 'act-close'
					: ''
	);
	let fadeDuration = $derived(reducedMotion ? 0 : currentBeat.act === 'cold-open' ? 520 : 240);

	$effect(() => {
		if (!browser) return;
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mql.matches;
		const handleChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};
		mql.addEventListener('change', handleChange);
		return () => mql.removeEventListener('change', handleChange);
	});

	function advance() {
		if (currentBeatIndex < story.beats.length) {
			direction = 1;
			currentBeatIndex += 1;
			deeperExpanded = false;
		}
	}

	function goBack() {
		if (currentBeatIndex > 1) {
			direction = -1;
			currentBeatIndex -= 1;
			deeperExpanded = false;
		}
	}

	function jumpTo(beatIndex: number) {
		direction = beatIndex >= currentBeatIndex ? 1 : -1;
		currentBeatIndex = beatIndex;
		deeperExpanded = false;
	}

	function toggleDeeper() {
		deeperExpanded = !deeperExpanded;
	}

	function handleStageKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			advance();
		}
	}

	// Arrow keys work anywhere on the page, no focus required, since
	// this will often be presented from a laptop in a room where
	// arrow keys are the natural advancing gesture.
	function handleWindowKeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowRight') {
			event.preventDefault();
			advance();
		} else if (event.key === 'ArrowLeft') {
			event.preventDefault();
			goBack();
		}
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<div class="engine theme-{story.theme} {actClass}">
	<div class="grain" aria-hidden="true"></div>
	<div class="glow glow-a" aria-hidden="true"></div>
	<div class="glow glow-b" aria-hidden="true"></div>
	<div class="glow glow-c" aria-hidden="true"></div>

	<div class="progress-track" aria-hidden="true">
		<div class="progress-fill" style="width: {progress}%"></div>
	</div>

	<header class="chrome" class:visible={chromeVisible}>
		<div class="brandmark">
			<span class="dot"><span></span></span>
			<span class="brand-name">{story.title}</span>
		</div>
		{#if chromeVisible}
			<div class="chapter-slot">
				<ChapterBar acts={story.acts} {currentBeatIndex} onJump={jumpTo} />
			</div>
		{/if}
	</header>

	{#if currentBeatIndex > 1}
		<button type="button" class="back-chevron" onclick={goBack} aria-label="Previous beat">
			&lsaquo;
		</button>
	{/if}

	<div class="stage" role="button" tabindex="0" onclick={advance} onkeydown={handleStageKeydown}>
		{#key currentBeatIndex}
			<div
				class="beat"
				in:fly={{ x: direction * 44, duration: fadeDuration, easing: cubicOut }}
			>
				<BlockRenderer block={currentBeat.primary} />

				{#if currentBeat.support}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						class="support"
						onclick={(event) => event.stopPropagation()}
						in:fly|global={{
							y: 18,
							duration: fadeDuration,
							delay: reducedMotion ? 0 : 170,
							easing: cubicOut
						}}
					>
						<BlockRenderer block={currentBeat.support} />
					</div>
				{/if}

				{#if currentBeat.deeper}
					<button
						type="button"
						class="go-deeper"
						in:fade|global={{ duration: fadeDuration, delay: reducedMotion ? 0 : 300 }}
						onclick={(event) => {
							event.stopPropagation();
							toggleDeeper();
						}}
					>
						{deeperExpanded ? 'Show less' : 'Go deeper'}
					</button>
				{/if}

				{#if deeperExpanded && currentBeat.deeper}
					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<div
						class="deeper-content"
						onclick={(event) => event.stopPropagation()}
						transition:slide={{ duration: reducedMotion ? 0 : 340, easing: cubicOut }}
					>
						{#each currentBeat.deeper as block}
							<BlockRenderer {block} />
						{/each}
					</div>
				{/if}
			</div>
		{/key}
	</div>

	{#if currentBeatIndex === 1}
		<div class="tap-hint" transition:fade={{ duration: reducedMotion ? 0 : 300 }}>
			Tap anywhere to begin
		</div>
	{/if}
</div>

<style>
	.engine {
		position: relative;
		height: 100dvh;
		display: flex;
		flex-direction: column;
		padding: 0 28px;
		overflow: hidden;
		transition: background-color 0.8s ease;
	}

	/* The same quiet paper texture as the discovery documents, so the
	   story feels like part of the same family the moment it opens. */
	.grain {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		opacity: 0.5;
		background-image: radial-gradient(
			circle at 1px 1px,
			var(--grain-dot, rgba(28, 26, 23, 0.05)) 1px,
			transparent 0
		);
		background-size: 4px 4px;
	}

	.progress-track {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: 3px;
		z-index: 20;
		background: transparent;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--accent), var(--accent-deep));
		transition: width 0.35s ease;
	}

	.chrome {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding-top: 28px;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.4s ease;
	}

	.chrome.visible {
		opacity: 1;
		pointer-events: auto;
	}

	.brandmark {
		grid-column: 1;
		justify-self: start;
		display: flex;
		align-items: center;
		gap: 11px;
		font-weight: 600;
		letter-spacing: 0.02em;
		font-size: 0.85rem;
		color: var(--ink-2);
		text-transform: uppercase;
		transition: color 0.6s ease;
	}

	.brandmark .dot {
		width: 22px;
		height: 22px;
		border-radius: 6px;
		background: linear-gradient(150deg, var(--accent), var(--accent-deep));
		display: grid;
		place-items: center;
		flex-shrink: 0;
	}

	.brandmark .dot span {
		width: 7px;
		height: 7px;
		background: var(--paper);
		border-radius: 50%;
	}

	.chapter-slot {
		grid-column: 2;
		justify-self: center;
	}

	.back-chevron {
		position: fixed;
		top: 50%;
		left: 20px;
		transform: translateY(-50%);
		z-index: 10;
		background: none;
		border: none;
		font-size: 2rem;
		line-height: 1;
		color: var(--ink-2);
		cursor: pointer;
		padding: 10px 14px;
	}

	.back-chevron:hover {
		color: var(--accent);
	}

	/* Ambient light fields, the layer the glass cards blur against.
	   Soft enough to feel like atmosphere, not decoration. */
	.glow {
		position: fixed;
		pointer-events: none;
		z-index: 0;
		border-radius: 50%;
	}

	.glow-a {
		top: -180px;
		right: -140px;
		width: 560px;
		height: 560px;
		background: radial-gradient(circle, rgba(36, 96, 132, 0.14), transparent 68%);
	}

	.glow-b {
		bottom: -220px;
		left: -160px;
		width: 640px;
		height: 640px;
		background: radial-gradient(circle, rgba(12, 60, 96, 0.1), transparent 70%);
	}

	/* Finale glow: dormant through the whole story, rises beneath the
	   closing beats. */
	.glow-c {
		bottom: -280px;
		left: 50%;
		width: 780px;
		height: 780px;
		margin-left: -390px;
		background: radial-gradient(circle, rgba(36, 96, 132, 0.18), transparent 70%);
		opacity: 0;
		transition: opacity 1.4s ease;
	}

	.act-close .glow-c {
		opacity: 1;
	}

	.glow {
		transition: transform 1.2s ease;
	}

	.act-dark .glow-a,
	.act-dark .glow-b {
		transform: scale(1.25);
	}

	.act-cold .grain {
		opacity: 0.3;
	}

	.stage {
		position: relative;
		z-index: 1;
		flex: 1;
		min-height: 0;
		display: flex;
		justify-content: center;
		overflow-y: auto;
		padding: 40px 0 52px;
		cursor: pointer;
		outline: none;
	}

	.stage:focus-visible {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
		border-radius: 12px;
	}

	.beat {
		max-width: 38rem;
		margin: auto 0;
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.support {
		padding-top: 6px;
	}

	.go-deeper {
		align-self: flex-start;
		background: none;
		border: 1px solid var(--line);
		border-radius: 20px;
		padding: 8px 18px;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		color: var(--accent-deep);
		cursor: pointer;
	}

	.go-deeper:hover {
		border-color: var(--accent);
	}

	.deeper-content {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding: 4px 10px 40px;
		--text-block-font: var(--font-body);
		--text-block-size: 1.05rem;
		--text-block-line-height: 1.7;
		--text-block-color: var(--ink-2);
	}

	.tap-hint {
		position: fixed;
		bottom: 40px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 5;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--ink-3);
		animation: hint-pulse 2.4s ease-in-out infinite;
		pointer-events: none;
	}

	@keyframes hint-pulse {
		0%,
		100% {
			opacity: 0.45;
		}
		50% {
			opacity: 1;
		}
	}

	@media (max-width: 680px) {
		.engine {
			padding: 0 20px;
		}

		/* The three-column desktop grid cannot fit a phone: stack the
		   brandmark above the chapter bar, both centered. */
		.chrome {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 8px;
			padding-top: 16px;
		}

		/* The chevron moves to the bottom-left thumb zone as a glass
		   chip, clear of content, sized as a proper touch target. */
		.back-chevron {
			top: auto;
			bottom: calc(22px + env(safe-area-inset-bottom));
			left: 16px;
			transform: none;
			width: 46px;
			height: 46px;
			padding: 0;
			display: grid;
			place-items: center;
			background: var(--glass-bg);
			-webkit-backdrop-filter: blur(12px) saturate(1.15);
			backdrop-filter: blur(12px) saturate(1.15);
			border: 1px solid var(--glass-border);
			border-radius: 50%;
			box-shadow:
				inset 0 1px 0 var(--glass-inset),
				0 10px 22px -12px rgba(12, 60, 96, 0.45);
			font-size: 1.5rem;
			color: var(--ink);
		}

		/* Bottom padding reserves the chevron's zone and Safari's
		   dynamic bar so content never hides beneath either. */
		.stage {
			padding: 20px 0 calc(88px + env(safe-area-inset-bottom));
		}

		.tap-hint {
			bottom: calc(28px + env(safe-area-inset-bottom));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tap-hint {
			animation: none;
			opacity: 0.8;
		}

		.progress-fill {
			transition: none;
		}
	}
</style>
