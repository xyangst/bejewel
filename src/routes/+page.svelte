<script lang="ts">
	import Board from "$components/Board.svelte"
	import Footer from "$components/Footer.svelte"
	import GameOverModal from "$components/GameOverModal.svelte"
	import Header from "$components/Header.svelte"
	import { score } from "$lib/store"
	let showModal = false
</script>

<main class="flex flex-col h-100 max-w-6xl">
	<Header />
	<Board on:gameover={() => (showModal = true)} />
	<Footer />
	<GameOverModal bind:score={$score} bind:visible={showModal} />
</main>
