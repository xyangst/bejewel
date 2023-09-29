<script lang="ts">
	import { BOARD_PADDING, TILE_SIZE } from "$lib/config"
	import {
		areTilesAdjacent,
		getBoardScore,
		getClearedBoard,
		getCoordinates,
		getMatches,
		getResolvedBoard,
		swapTiles
	} from "$lib/game"
	import { board, moves, score } from "$lib/store"
	import { createEventDispatcher } from "svelte"
	import { flip } from "svelte/animate"
	import { quintOut } from "svelte/easing"
	import Tile from "./Tile.svelte"
	$: getCellStyle = (i: number) => {
		const pos = getCoordinates(i)
		return `
      top: ${$TILE_SIZE * pos.x + BOARD_PADDING}px;
      left: ${$TILE_SIZE * pos.y + BOARD_PADDING}px;
    `
	}
	function swapTile(tile1: number, tile2: number) {
		selectedTile = null
		board.set(swapTiles(tile1, tile2, $board))
		const matches = getMatches($board)
		if (matches.length === 0) {
			//if no matches undo
			setTimeout(() => board.set(swapTiles(tile1, tile2, $board)), 200)
			return
		}
		moves.set(Math.max($moves - 1, 0))
		resolveBoardOnce(1)
	}
	const dispatch = createEventDispatcher()

	function resolveBoardOnce(scoreMult: number) {
		board.set(getClearedBoard($board))
		setTimeout(() => {
			score.set($score + getBoardScore($board, scoreMult))
			board.set(getResolvedBoard($board))

			setTimeout(() => {
				const matches = getMatches($board)
				if (matches.length > 0) resolveBoardOnce(scoreMult)
				else if ($moves === 0) dispatch("gameover")
			}, 350)
		}, 200)
	}
	let selectedTile: null | number = null
</script>

{#each $board as tile, i (tile.id)}
	<span
		class="tile-wrapper absolute"
		animate:flip={{ delay: 0, duration: 250, easing: quintOut }}
		style="
				width: var(--tile-size);
		        height: var(--tile-size);
				{getCellStyle(i)}"
	>
		<Tile
			{tile}
			on:click={() => {
				if (selectedTile == i) selectedTile = null
				else if (selectedTile === null || !areTilesAdjacent(selectedTile, i)) selectedTile = i
				else swapTile(selectedTile, i)
			}}
			selected={selectedTile === i}
		/>
	</span>
{/each}
