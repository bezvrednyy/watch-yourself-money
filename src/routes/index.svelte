<script>
	import {pokemonStore} from '../stores/pokestore.js'
	import PokemanCard from '../components/pokemanCard.svelte'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class="text-2xl text-center my-8 uppercase">Poke store</h1>
	<div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
		{#each $pokemonStore as pokemon}
			<PokemanCard pokeman={pokemon}/>
		{/each}
	</div>
</section>

<style>
	h1 {
		color: green;
	}
</style>
