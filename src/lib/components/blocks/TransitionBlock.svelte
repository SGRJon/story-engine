<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'transition' }> } = $props();
</script>

<div class="transition-block" class:shifted={block.paletteShift}>
	<p>{block.body}</p>
</div>

<style>
	.transition-block {
		position: relative;
		overflow: hidden;
		border-radius: 16px;
		padding: 40px 42px;
	}

	.transition-block.shifted {
		background: var(--ink);
		color: var(--paper);
	}

	.transition-block.shifted::before {
		content: '';
		position: absolute;
		top: -40px;
		right: -40px;
		width: 200px;
		height: 200px;
		border-radius: 50%;
		background: radial-gradient(circle, var(--on-dark-glow), transparent 70%);
	}

	p {
		position: relative;
		margin: 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: clamp(1.3rem, 4vw, 1.8rem);
		line-height: 1.4;
	}
</style>
