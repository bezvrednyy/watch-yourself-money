import type {GetPokemonResponse} from '../../../stores/pokestore.js'

//Пример работы с Rest API, метод - это название экспортируемой функции.
export async function get({
    params,
}) {
    const url = `https://pokeapi.co/api/v2/pokemon/${params.id}`
    const res = await fetch(url)
    const data: GetPokemonResponse = await res.json()
    return {
        status: 200,
        body: data,
    }
}