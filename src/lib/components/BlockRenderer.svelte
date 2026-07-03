<script lang="ts">
	import type { Block } from '$lib/content/types';
	import TextBlock from './blocks/TextBlock.svelte';
	import QuoteBlock from './blocks/QuoteBlock.svelte';
	import PhoneMockBlock from './blocks/PhoneMockBlock.svelte';
	import GridBlock from './blocks/GridBlock.svelte';
	import TableBlock from './blocks/TableBlock.svelte';
	import TransitionBlock from './blocks/TransitionBlock.svelte';

	let { block }: { block: Block } = $props();
</script>

{#if block.type === 'text'}
	<TextBlock {block} />
{:else if block.type === 'quote'}
	<QuoteBlock {block} />
{:else if block.type === 'phoneMock'}
	<PhoneMockBlock {block} />
{:else if block.type === 'grid'}
	<GridBlock {block} />
{:else if block.type === 'table'}
	<TableBlock {block} />
{:else if block.type === 'transition'}
	<TransitionBlock {block} />
{/if}
