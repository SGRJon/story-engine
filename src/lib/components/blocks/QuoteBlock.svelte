<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'quote' }> } = $props();

	// A quote's body can carry line breaks. When it does, the lines
	// before the last read as narrative lead-in, and the final line
	// is the spoken quote itself, which gets the emphatic treatment.
	// A single-line quote is all quote, no lead-in.
	let lines = $derived(block.body.split('\n'));
	let hasLeadIn = $derived(lines.length > 1);
</script>

<figure class="quote-block">
	<blockquote>
		{#each lines as line, i}
			<p class:lead-in={hasLeadIn && i < lines.length - 1} class:spoken={!hasLeadIn || i === lines.length - 1}>
				{line}
			</p>
		{/each}
	</blockquote>
	{#if block.attribution}
		<figcaption>{block.attribution}</figcaption>
	{/if}
</figure>

<style>
	.quote-block {
		margin: 0;
	}

	blockquote {
		margin: 0;
	}

	blockquote p {
		margin: 0;
	}

	blockquote p + p {
		margin-top: 18px;
	}

	.lead-in {
		font-family: var(--font-display);
		font-weight: 400;
		font-style: normal;
		font-size: clamp(1.35rem, 3.4vw, 1.85rem);
		line-height: 1.4;
		color: var(--ink);
	}

	.spoken {
		font-family: var(--font-display);
		font-style: italic;
		font-weight: 600;
		font-size: clamp(1.8rem, 5vw, 2.7rem);
		line-height: 1.3;
		color: var(--accent-deep);
	}

	figcaption {
		margin-top: 22px;
		padding-left: 56px;
		position: relative;
		font-family: var(--font-mono);
		font-size: 0.78rem;
		letter-spacing: 0.07em;
		text-transform: uppercase;
		color: var(--ink-3);
	}

	/* A short rule leading into the attribution, drawn in CSS. */
	figcaption::before {
		content: '';
		position: absolute;
		left: 14px;
		top: 50%;
		width: 30px;
		height: 1px;
		background: var(--ink-3);
	}
</style>
