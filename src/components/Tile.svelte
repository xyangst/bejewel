<script lang="ts">
	import { TILE_SIZE } from "$lib/config"
	import type { Tile } from "$lib/game"

	export let tile: Tile
	export let selected = false
</script>

<div class="cell" class:selected-cell={selected} />

{#if tile.type !== null}
	<button
		on:click
		class="p-1"
		style="
	    width: {$TILE_SIZE}px;
		height: {$TILE_SIZE}px;"
		><div class="tile tile{tile.type}" class:selected-tile={selected} style="--tile-size:60px;" />
	</button>
{/if}

<style>
	.selected-tile {
		@apply brightness-75;
	}
	.tile1 {
		@apply hue-rotate-[200deg];
	}
	.tile2 {
		@apply hue-rotate-[280deg];
	}
	.tile3 {
		@apply hue-rotate-[100deg];
	}
	.tile4 {
		@apply hue-rotate-[50deg];
	}
	.cell {
		position: absolute;
		width: var(--tile-size);
		height: var(--tile-size);
		pointer-events: none;
		z-index: 2;
	}
	.selected-cell {
		background-image: url(/assets/target.svg);
		animation: pulse 1.2s infinite;
	}
	.tile {
		@apply bg-cover bg-center w-full h-full;
		background-image: url(https://cdn.discordapp.com/attachments/728137623775739995/1157238636299952149/fd2c8a111c5425b2404ab9e5560f2586.png);
	}
	@keyframes pulse {
		0% {
			transform: scale(1.15);
		}

		50% {
			transform: scale(1.3);
		}

		100% {
			transform: scale(1.15);
		}
	}
</style>
