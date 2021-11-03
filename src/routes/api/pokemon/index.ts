import type {GetPokemonResponse, PokemonData} from '../../../stores/pokestore.js'

//Пример работы с Rest API, метод - это название экспортируемой функции.
export async function get({
	params,
}) {
	const url = `https://pokeapi.co/api/v2/pokemon?limit=15`
	const res = await fetch(url)
	const data: GetPokemonResponse = await res.json()
	const loadedPokemon: Array<PokemonData> = data.results.map((pokemon , index) => {
		const id = index + 1
		return {
			id: `${index + 1}`,
			name: pokemon.name,
			image: getPokemonImageUrlById(id),
		}
	})
	return {
		status: 200,
		body: loadedPokemon,
	}
}

function getPokemonImageUrlById(id: number): string {
	return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}
