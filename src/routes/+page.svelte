<script lang="ts">
	import '$lib/themes/findme-blue.css';
</script>

<svelte:head>
	<title>UpSkillPros Stories</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="root theme-findme-blue">
	<div class="grain" aria-hidden="true"></div>
	<div class="glow" aria-hidden="true"></div>
	<main class="mark">
		<span class="dot"><span></span></span>
		<span class="wordmark">UpSkillPros Stories</span>
	</main>
</div>

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

	.root {
		position: relative;
		height: 100dvh;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.grain {
		position: fixed;
		inset: 0;
		pointer-events: none;
		opacity: 0.5;
		background-image: radial-gradient(
			circle at 1px 1px,
			var(--grain-dot, rgba(28, 26, 23, 0.05)) 1px,
			transparent 0
		);
		background-size: 4px 4px;
	}

	.glow {
		position: fixed;
		top: 50%;
		left: 50%;
		width: 620px;
		height: 620px;
		margin: -310px 0 0 -310px;
		pointer-events: none;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(36, 96, 132, 0.12), transparent 68%);
	}

	.mark {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 18px;
	}

	.dot {
		width: 46px;
		height: 46px;
		border-radius: 13px;
		background: linear-gradient(150deg, var(--accent), var(--accent-deep));
		display: grid;
		place-items: center;
		box-shadow: 0 16px 30px -16px rgba(12, 60, 96, 0.55);
	}

	.dot span {
		width: 14px;
		height: 14px;
		background: var(--paper);
		border-radius: 50%;
	}

	.wordmark {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		letter-spacing: 0.22em;
		text-transform: uppercase;
		color: var(--ink-3);
	}
</style>
