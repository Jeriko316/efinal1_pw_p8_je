import axios from "axios";


const consumirPokemon  = async(id) => {
    const respuesta = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return respuesta.data;
}

export const obtenerObjetoPokemon = async(numero) => {
    const data = await consumirPokemon(numero);
    return {
        nombre: data.name,
        id: data.id,
        img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${data.id}.svg`
    };
};

// Esta función recibe un arreglo de ids y retorna los objetos pokemon
export const obtenerArregloPokemon = async (arregloNumerico) => {
    const vector = [];

    for(let numero of arregloNumerico) {
        const objetoPokemon = await obtenerObjetoPokemon(numero);
        vector.push(objetoPokemon);
    }
    return vector;
};

