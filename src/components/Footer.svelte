<script lang="ts">
	import { ghlink, startingMoves, title } from "$lib/config"
	import { generateRandomBoard } from "$lib/game"
	import { board, moves, score } from "$lib/store"
	import Button from "$components/Button.svelte"
	import InfoBox from "$components/InfoBox.svelte"
	const resetBoard = () => {
		board.set(generateRandomBoard())
		score.set(0)
		moves.set(startingMoves)
	}
</script>

<footer class="flex justify-between pt-3 h-24">
	<InfoBox class="space-y-2">
		<p>{title}</p>
		<p>
			Source code on <a class="underline" href={ghlink} target="_blank">Github</a>
		</p>
	</InfoBox>
	<Button class="text-3xl" on:click={resetBoard}>Reset</Button>
</footer>
