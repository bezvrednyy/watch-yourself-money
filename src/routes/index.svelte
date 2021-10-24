<script>
	import {pokemonStore} from '../stores/pokestore.js'
	console.log($pokemonStore)
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1>Poke store</h1>
	{#each $pokemonStore as pokemon}
		<p>{pokemon.name}</p>
	{/each}
</section>

<style>
	h1 {
		color: green;
	}
</style>
