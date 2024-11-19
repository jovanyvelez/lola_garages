<script lang="ts">
	import Cabeza from "./header.svelte";
	import Pie from "./footer.svelte";
	import "../../app.css"
	let { children } = $props();
</script>


<Cabeza/>
<main>
    <div class="bodi">
		{@render children()}
		</div>
</main>
<Pie/>