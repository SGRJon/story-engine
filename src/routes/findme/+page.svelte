<script lang="ts">
	import '$lib/themes/findme-blue.css';
	import { findme } from '$lib/content/stories/findme';
	import StoryEngine from '$lib/components/StoryEngine.svelte';
</script>

<svelte:head>
	<title>FindMe</title>
	<meta name="robots" content="noindex, nofollow" />
	{#if findme.favicon}
		<link rel="icon" type="image/svg+xml" href={findme.favicon} />
	{/if}
</svelte:head>

<StoryEngine story={findme} />

<style>
	:global(html) {
		box-sizing: border-box;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: inherit;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		line-height: 1.6;
		-webkit-font-smoothing: antialiased;
	}
</style>
