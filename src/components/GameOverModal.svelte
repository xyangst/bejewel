<script lang="ts">
	import { generateRandomBoard } from "$lib/game"
	import { board } from "$lib/store"
	import Button from "$components/Button.svelte"
	import InfoBox from "$components/InfoBox.svelte"
	export let visible = false
	export let score: number
	let bestScore = !isNaN(Number(localStorage.getItem("high")))
		? Number(localStorage.getItem("high"))
		: 0
	$: () => {
		const newBest = Math.max(score, bestScore)
		if (newBest > bestScore) {
			localStorage.setItem("high", String(newBest))
			bestScore = newBest
		}
	}
</script>

<div
	class="overlay fixed top-0 left-0 right-0 bottom-0 bg-opacity-60 bg-black p-6 hidden justify-center items-center"
	class:visible
>
	<InfoBox class="px-5 py-10 w-80 gap-y-6 text-center text-3xl">
		<div class="text-4xl">Game Over</div>
		<div class="text-5xl">{score}</div>
		<div class="">Best: {bestScore}</div>
		<Button
			on:click={() => {
				visible = false
				board.set(generateRandomBoard())
			}}>Play Again</Button
		>
	</InfoBox>
</div>

<style>
	.visible {
		display: flex;
	}
</style>
