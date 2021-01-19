import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Pokemon.module.scss';

function Pokemon({ match }) {
  const {
    params: { id },
  } = match;
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    async function getPokemonApi() {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {})
        .then((res) => res.json())
        .then((response) => {
          setPokemon(response);
          setIsLoading(false);
          console.log('111');
        })
        .catch((error) => console.log(error));
    }

    getPokemonApi()
  }, [id]);

  return (
    <>
      <Link to="/">
        Go back
      </Link>
      {!isLoading && pokemon && (
        <ul className={styles.pokemon}>
          <li>
            <b>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </b>
          </li>
          <li>
            <img src={pokemon.sprites.front_default} />
          </li>
          <li><b>Height:</b> {pokemon.height}</li>
          <li><b>Weight:</b> {pokemon.weight}</li>
          <li>
            <ul><b>Abilities:</b> {pokemon.abilities.map(ability => (
              <li>- {ability.ability.name}</li>
            ))}
            </ul>
          </li>
          <li>
            <ul><b>Types:</b> {pokemon.types.map(type => (
              <li>- {type.type.name}</li>
            ))}
            </ul>
          </li>
        </ul>)}
    </>
  )
}

export default Pokemon
