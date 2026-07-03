<script lang="ts">
	import type { Block } from '$lib/content/types';

	let { block }: { block: Extract<Block, { type: 'table' }> } = $props();
</script>

<!-- The wrapper carries the card shape. Rounding the table element
     itself is unreliable across browsers, so the card clips it. -->
<div class="table-card">
	<table>
		<thead>
			<tr>
				{#each block.headers as header}
					<th>{header}</th>
				{/each}
			</tr>
		</thead>
		<tbody>
			{#each block.rows as row}
				<tr>
					{#each row as cell}
						<td>{cell}</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.table-card {
		border-radius: 15px;
		overflow: hidden;
		border: 1px solid rgba(255, 255, 255, 0.7);
		background: rgba(251, 252, 254, 0.6);
		-webkit-backdrop-filter: blur(14px) saturate(1.15);
		backdrop-filter: blur(14px) saturate(1.15);
		box-shadow:
			inset 0 1px 0 rgba(255, 255, 255, 0.85),
			0 18px 34px -20px rgba(12, 60, 96, 0.4),
			0 4px 10px -6px rgba(26, 36, 48, 0.15);
	}

	table {
		width: 100%;
		border-collapse: separate;
		border-spacing: 0;
		font-size: 0.92rem;
	}

	thead th {
		background: linear-gradient(160deg, #26313f, var(--ink));
		color: var(--paper);
		font-weight: 600;
		font-size: 0.78rem;
		letter-spacing: 0.04em;
		text-align: left;
		padding: 12px 18px;
	}

	tbody td {
		padding: 12px 18px;
		border-top: 1px solid var(--line);
		color: var(--ink-2);
		line-height: 1.5;
	}

	tbody tr:first-child td {
		border-top: none;
	}

	tbody td:first-child {
		font-family: var(--font-mono);
		color: var(--accent-deep);
		font-weight: 500;
		white-space: nowrap;
	}
</style>
