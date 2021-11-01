import {writable} from "svelte/store"

/**
 * @typedef {{
 *   id: string,
 *   name: string,
 *   image: string,
 * }}
 */
let PokemonData

/**
 * @typedef {{
 *   results: Array<PokemonData>,
 * }}
 */
let GetPokemonResponse

const pokemonStore = writable(/** @type {Array<PokemonData>} */([]))

/**
 * @param {number} count
 */
const fetchPokemon = async (count) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${count}`
    const res = await fetch(url)
    /** @type {unknown} */
    const data = await res.json()
    /** @type {Array<PokemonData>} */
    const loadedPokemon = /** @type {GetPokemonResponse} */(data).results.map((pokemon , index) => {
        const id = index + 1
        return {
            id: `${index + 1}`,
            name: pokemon.name,
            image: getPokemonImageUrlById(id),
        }
    })
    pokemonStore.set(loadedPokemon)
}

setTimeout(() => {
    fetchPokemon(5)
}, 2000)

/**
 * @param {number} id
 * @return {string}
 */
function getPokemonImageUrlById(id) {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
}

export {
    pokemonStore,
}