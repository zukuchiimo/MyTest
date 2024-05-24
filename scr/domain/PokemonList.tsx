// PokemonList.js
import {useState, useEffect} from 'react';
import axios from 'axios';

const usePokemons = () => {
  const [loading, setLoading] = useState(true);
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(
          'https://pokeapi.co/api/v2/pokemon?limit=20',
        );
        const results = await Promise.all(
          response.data.results.map(async pokemon => {
            const pokeDetails = await axios.get(pokemon.url);
            fetchPokemonsDetail(pokemon.url);
            return {
              name: pokemon.name,
              image: pokeDetails.data.sprites.front_default,
              peso: await fetchPokemonsDetail(pokemon.url),
            };
          }),
        );
        setPokemons(results);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setPokemons([]);
      } finally {
        setLoading(false);
      }
    };
    const fetchPokemonsDetail = async (UrlPokemon: string) => {
      const response = await axios.get(UrlPokemon);
      let id = response.data.id;
      let peso = response.data.weight;
      let height = response.data.height;
      return [id, peso, height];
    };
    fetchPokemons();
  }, []);

  return {loading, pokemons};
};

export default usePokemons;
