<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'grid' }> } = $props();

	// A label with a colon splits into a bold heading (everything up
	// to and including the colon's position, colon dropped) and the
	// rest, so scenario cards read with a clear title line.
	function split(label: string) {
		const i = label.indexOf(':');
		if (i === -1) return { head: null, rest: label };
		return { head: label.slice(0, i), rest: label.slice(i + 1).trim() };
	}
</script>

<div class="grid-block">
	{#each block.items as item}
		{@const parts = split(item.label)}
		<div class="grid-item">
			{#if parts.head}
				<strong class="item-head">{parts.head}</strong>
			{/if}
			<span class="item-body">{parts.rest}</span>
		</div>
	{/each}
</div>

<style>
	.grid-block {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: 14px;
	}

	/* Glass cards: translucent surface blurring the glow and grain
	   behind it, a light inner edge on top, and deep soft shadow. */
	.grid-item {
		display: flex;
		flex-direction: column;
		gap: 6px;
		background: rgba(251, 252, 254, 0.55);
		-webkit-backdrop-filter: blur(14px) saturate(1.15);
		backdrop-filter: blur(14px) saturate(1.15);
		border: 1px solid rgba(255, 255, 255, 0.7);
		border-radius: 15px;
		padding: 18px 20px;
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.85),
			0 18px 34px -20px rgba(12, 60, 96, 0.4),
			0 4px 10px -6px rgba(26, 36, 48, 0.15);
	}

	.item-head {
		font-weight: 700;
		font-size: 0.92rem;
		line-height: 1.35;
		color: var(--ink);
	}

	.item-body {
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--ink-2);
	}
</style>
