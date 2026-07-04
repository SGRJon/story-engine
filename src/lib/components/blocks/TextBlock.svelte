<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'text' }> } = $props();

	// A phrase wrapped in *asterisks* renders as an italicized inline
	// quote, the same idea as [ ] marking a phone-mock button, so
	// content authors never need to touch component code for this.
	function parts(body: string) {
		return body.split(/(\*[^*]+\*)/g).map((segment) => {
			if (segment.startsWith('*') && segment.endsWith('*')) {
				return { text: segment.slice(1, -1), italic: true };
			}
			return { text: segment, italic: false };
		});
	}

	// Type scale responds to how much is being said. A four-word beat
	// lands huge; a longer thought settles down to stay comfortable.
	// The thresholds count visible characters, ignoring the asterisk
	// markup so styling never changes sizing.
	let visibleLength = $derived(block.body.replaceAll('*', '').length);
	let scale = $derived(visibleLength <= 64 ? 'xl' : visibleLength <= 150 ? 'lg' : 'md');
</script>

<p class="text-block scale-{scale}" class:emphasis={block.emphasis}>
	{#each parts(block.body) as part}
		{#if part.italic}<em>{part.text}</em>{:else}{part.text}{/if}
	{/each}
</p>

<style>
	/*
	 * The custom properties (set by the engine's deeper-content
	 * wrapper) always win over the scale classes, so deeper text
	 * renders at calm paragraph size regardless of length.
	 */
	.text-block {
		margin: 0;
		font-family: var(--text-block-font, var(--font-display));
		font-weight: var(--text-block-weight, 400);
		line-height: var(--text-block-line-height, 1.22);
		color: var(--text-block-color, var(--ink));
		letter-spacing: -0.015em;
	}

	.scale-xl {
		font-size: var(--text-block-size, clamp(2.4rem, 6.5vw, 4rem));
	}

	.scale-lg {
		font-size: var(--text-block-size, clamp(1.9rem, 4.8vw, 2.9rem));
	}

	.scale-md {
		font-size: var(--text-block-size, clamp(1.4rem, 3.2vw, 2rem));
		line-height: var(--text-block-line-height, 1.35);
	}

	@media (max-width: 680px) {
		.scale-xl {
			font-size: var(--text-block-size, clamp(2rem, 8.5vw, 2.5rem));
		}

		.scale-lg {
			font-size: var(--text-block-size, clamp(1.65rem, 7vw, 2.1rem));
		}

		.scale-md {
			font-size: var(--text-block-size, clamp(1.3rem, 5.5vw, 1.7rem));
		}
	}

	.text-block.emphasis {
		font-weight: 600;
		color: var(--accent-deep);
	}

	.text-block em {
		font-style: italic;
	}
</style>
