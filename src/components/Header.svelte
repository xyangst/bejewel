<script lang="ts">
	import { moves, score } from "$lib/store"
	import InfoBox from "$components/InfoBox.svelte"
</script>

<header class="h-24 flex justify-between pb-3">
	<InfoBox class="moves">
		<h1 class="">Moves</h1>
		<p class="text-3xl">{$moves}</p>
	</InfoBox>
	<InfoBox class="w-36 md:w-52 text-right">
		<h1 class="">Score</h1>
		<p class="text-3xl">{$score}</p>
	</InfoBox>
</header>
