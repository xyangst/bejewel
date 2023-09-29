<script lang="ts">
	import Tile from "$components/Tile.svelte"
	import { BOARD_PADDING, TILE_SIZE, columns, rows } from "$lib/config"
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
	import { createEventDispatcher, onMount } from "svelte"
	import { flip } from "svelte/animate"
	import { quintOut } from "svelte/easing"
	const dispatch = createEventDispatcher()
    let docWidth = document.body.clientWidth;
	function getTileSize() {
    docWidth = document.body.clientWidth;
    let sizes = [60, 50, 40, 30];
    let minWdth;
    for (let size of sizes) {
        minWdth = BOARD_PADDING * 2 + 40 * 2 + columns * size;
        if (docWidth >= minWdth) {
            return size;
        }
    }
    return sizes[sizes.length - 1];
}


	onMount(() => {
		addEventListener("resize", () => {
			console.log($TILE_SIZE * columns + BOARD_PADDING * 2,document.body.clientWidth)
			TILE_SIZE.set(getTileSize())
		})
	})

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

<main class="flex items-center">
	<div
		class="relative bg-crack shadow-xl rounded-md"
		style="
    width: {$TILE_SIZE * columns + BOARD_PADDING * 2}px;
    height: {$TILE_SIZE * rows + BOARD_PADDING * 2}px;
    --tile-size: {$TILE_SIZE}px;
  "
	>
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
	</div>
</main>
