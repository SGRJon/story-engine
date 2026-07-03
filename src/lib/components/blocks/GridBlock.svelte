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

	// A small built-in icon set, all drawn in the same line style:
	// 24 viewBox, 1.6 stroke, round caps. Content references icons
	// by name; unknown names simply render no icon.
	const icons: Record<string, string> = {
		wristband:
			'<rect x="3.5" y="8.5" width="17" height="7" rx="3.5"/><circle cx="12" cy="12" r="1.4"/>',
		'shoe-tag':
			'<path d="M12 3H3v9l8.6 8.6a2 2 0 0 0 2.8 0l6.2-6.2a2 2 0 0 0 0-2.8z"/><circle cx="7.5" cy="7.5" r="1.4"/>',
		'zipper-pull':
			'<path d="M9.5 3.5h5l1.2 8.5h-7.4z"/><circle cx="12" cy="17" r="2.6"/><path d="M12 12v2.4"/>',
		pendant:
			'<path d="M4 4.5c2.5 3.4 5.5 5.2 8 5.2s5.5-1.8 8-5.2"/><path d="M12 9.7v1.6"/><circle cx="12" cy="15" r="3.6"/>',
		'clothing-tag':
			'<rect x="5.5" y="4" width="13" height="16" rx="2"/><circle cx="9.8" cy="7.4" r="0.9"/><circle cx="14.2" cy="7.4" r="0.9"/>',
		'key-fob':
			'<circle cx="7.8" cy="7.8" r="3.4"/><path d="M10.2 10.2l1.6 1.6"/><rect x="11.6" y="11.6" width="8" height="8" rx="2"/>'
	};
</script>

<div class="grid-block">
	{#each block.items as item}
		{@const parts = split(item.label)}
		<div class="grid-item" class:product={!parts.head}>
			{#if item.icon && icons[item.icon]}
				<svg
					class="item-icon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.6"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					{@html icons[item.icon]}
				</svg>
			{/if}
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
		background: var(--glass-bg);
		-webkit-backdrop-filter: blur(14px) saturate(1.15);
		backdrop-filter: blur(14px) saturate(1.15);
		border: 1px solid var(--glass-border);
		border-radius: 15px;
		padding: 18px 20px;
		box-shadow:
			inset 0 1px 0 var(--glass-inset),
			0 18px 34px -20px rgba(12, 60, 96, 0.4),
			0 4px 10px -6px rgba(26, 36, 48, 0.15);
	}

	/* Product cards: a lineup, not a settings page. Centered label in
	   the display face, taller presence, a lift on hover. */
	.item-icon {
		width: 32px;
		height: 32px;
		color: var(--accent);
		flex-shrink: 0;
	}

	.grid-item.product {
		align-items: center;
		justify-content: center;
		gap: 12px;
		padding: 24px 16px;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	.grid-item.product .item-body {
		font-family: var(--font-display);
		font-size: 1.08rem;
		font-weight: 500;
		color: var(--ink);
		text-align: center;
		line-height: 1.3;
	}

	.grid-item.product:hover {
		transform: translateY(-4px);
		box-shadow:
			inset 0 1px 0 var(--glass-inset),
			0 26px 44px -22px rgba(12, 60, 96, 0.5),
			0 6px 14px -8px rgba(26, 36, 48, 0.2);
	}

	@media (prefers-reduced-motion: reduce) {
		.grid-item.product {
			transition: none;
		}

		.grid-item.product:hover {
			transform: none;
		}
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
