<script>
	import {isCaseInsensitiveSubstr} from '../../common/string.js'
	import {pokemonStore, PokemonData} from '../stores/pokestore.js'
	import PokemanCard from '../components/pokemanCard.svelte'

	let searchTerm = ''
	let filteredPokemon = []
	$: {
		/** @type {Array<PokemonData>} */
		const pokemonArray = [...$pokemonStore]
		console.log(pokemonArray)
		filteredPokemon = searchTerm
			? pokemonArray.filter(item => isCaseInsensitiveSubstr(item.name, searchTerm))
			: pokemonArray
	}
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	<h1 class='text-2xl text-center my-8 uppercase'>Poke store</h1>
	<input
		class='w-full rounded-md text-lg p-4 border-2 border-gray-200'
		bind:value={searchTerm}
	>

	<div class='py-4 grid gap-4 md:grid-cols-2 grid-cols-1'>
		{#each filteredPokemon as pokemon}
			<PokemanCard pokeman={pokemon}/>
		{/each}
	</div>
</section>

<style>
	h1 {
		color: green;
	}
</style>
