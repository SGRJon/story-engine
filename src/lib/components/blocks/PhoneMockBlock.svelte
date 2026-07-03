<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'phoneMock' }> } = $props();

	// A line wrapped in [ ] renders as a tappable button in the mock
	// screen instead of a line of message text, so content authors
	// never need to touch component code to add a button.
	function isButton(line: string) {
		return line.startsWith('[') && line.endsWith(']');
	}

	function buttonLabel(line: string) {
		return line.slice(1, -1).trim();
	}

	let messages = $derived(block.lines.filter((l) => !isButton(l)));
	let buttons = $derived(block.lines.filter(isButton).map(buttonLabel));

	// Typing mode: message lines write themselves out one character
	// at a time, line by line, with a caret on the active line. The
	// live-preview beat uses this to demonstrate the page updating
	// while you watch. Reduced motion renders everything instantly.
	let typedCounts = $state<number[]>([]);

	let activeLine = $derived(
		block.typing ? typedCounts.findIndex((c, i) => c < (messages[i]?.length ?? 0)) : -1
	);

	function visibleText(i: number) {
		if (!block.typing) return messages[i];
		return messages[i].slice(0, typedCounts[i] ?? messages[i].length);
	}

	$effect(() => {
		if (!block.typing) return;
		const lines = messages;
		const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
		if (mql.matches) {
			typedCounts = lines.map((l) => l.length);
			return;
		}
		const counts = lines.map(() => 0);
		typedCounts = [...counts];
		let line = 0;
		let pause = 16;
		const id = setInterval(() => {
			if (pause > 0) {
				pause -= 1;
				return;
			}
			if (line >= lines.length) {
				clearInterval(id);
				return;
			}
			if (counts[line] < lines[line].length) {
				counts[line] += 1;
				typedCounts = [...counts];
			} else {
				line += 1;
				pause = 12;
			}
		}, 28);
		return () => clearInterval(id);
	});
</script>

<div class="phone-mock">
	{#if block.label}
		<div class="mock-label">{block.label}</div>
	{/if}
	<div class="phone-frame">
		<div class="phone-screen">
			<div class="phone-notch"></div>
			<div class="mock-messages">
				{#each messages as line, i}
					<p class="mock-line" class:lead={i === 0}>
						{visibleText(i)}{#if i === activeLine}<span class="caret"></span>{/if}
					</p>
				{/each}
			</div>
			{#if buttons.length > 0}
				<div class="mock-actions">
					{#each buttons as label}
						<div class="mock-button">{label}</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	.phone-mock {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 20px;
	}

	.mock-label {
		text-align: center;
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent-deep);
	}

	/* A crafted device, not a rounded rectangle: gradient metal edge,
	   physical side buttons, a floating island notch inset from the
	   bezel, and a screen that catches a little light at the top. */
	.phone-frame {
		position: relative;
		width: 238px;
		height: 470px;
		border-radius: 42px;
		background: linear-gradient(165deg, #2b3745 0%, var(--ink) 45%, #10161f 100%);
		padding: 9px;
		box-shadow:
			0 34px 60px -28px rgba(12, 60, 96, 0.55),
			0 10px 24px -14px rgba(26, 36, 48, 0.4),
			inset 0 1px 0 rgba(255, 255, 255, 0.14);
	}

	/* Physical side buttons */
	.phone-frame::before {
		content: '';
		position: absolute;
		right: -2.5px;
		top: 118px;
		width: 3px;
		height: 58px;
		border-radius: 2px;
		background: #10161f;
	}

	.phone-frame::after {
		content: '';
		position: absolute;
		left: -2.5px;
		top: 96px;
		width: 3px;
		height: 88px;
		border-radius: 2px;
		background: #10161f;
	}

	.phone-screen {
		position: relative;
		width: 100%;
		height: 100%;
		background: linear-gradient(180deg, #ffffff 0%, var(--card) 30%, #f3f6fa 100%);
		border-radius: 34px;
		padding: 52px 18px 20px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Floating island, clearly inset from the bezel */
	.phone-notch {
		position: absolute;
		top: 14px;
		left: 50%;
		transform: translateX(-50%);
		width: 72px;
		height: 19px;
		border-radius: 10px;
		background: var(--ink);
		box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.12);
	}

	.mock-messages {
		display: flex;
		flex-direction: column;
		gap: 10px;
		text-align: center;
		padding: 12px 4px 0;
	}

	.mock-line {
		margin: 0;
		font-size: 0.9rem;
		line-height: 1.5;
		color: var(--ink-3);
	}

	.mock-line.lead {
		font-family: var(--font-display);
		font-size: 1.18rem;
		font-weight: 500;
		line-height: 1.35;
		color: var(--ink);
	}

	.caret {
		display: inline-block;
		width: 2px;
		height: 1em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: var(--accent);
		animation: caret-blink 0.9s steps(1) infinite;
	}

	@keyframes caret-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}

	.mock-actions {
		margin-top: auto;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.mock-button {
		padding: 12px 16px;
		border-radius: 12px;
		background: linear-gradient(150deg, var(--accent), var(--accent-deep));
		color: var(--paper);
		font-size: 0.9rem;
		font-weight: 600;
		text-align: center;
		box-shadow:
			0 8px 16px -8px rgba(12, 60, 96, 0.5),
			inset 0 1px 0 rgba(255, 255, 255, 0.18);
	}
</style>
