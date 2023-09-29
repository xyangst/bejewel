<script lang="ts">
	import { cn } from "$lib"
	let className: string | null = null
	export { className as class }
</script>

<div
	class={cn(
		className,
		"uppercase rounded-3xl shadow-md border-4 border-white bg-gradient-to-b bg-crack px-5 py-2 -tracking-tighter"
	)}
>
	<slot />
</div>
