import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner';
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
    <div className={styles.pokemonPage}>
      <Link to="/">
        Go back
      </Link>
      {!isLoading && pokemon ? (
        <div className={styles.pokemon}>
          <div>
            <b>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </b>
          </div>
          <div>
            <img src={pokemon.sprites.front_default} />
          </div>
          <div className={styles.pokemon__content}>
            <div><b>Height:</b> {pokemon.height}</div>
            <div><b>Weight:</b> {pokemon.weight}</div>
            <div>
              <div><b>Abilities:</b> {pokemon.abilities.map(ability => (
                <div>- {ability.ability.name}</div>
              ))}
              </div>
            </div>
            <div>
              <div><b>Types:</b> {pokemon.types.map(type => (
                <div>- {type.type.name}</div>
              ))}
              </div>
            </div>
          </div>
        </div>) : (
        <Loader
          type="Oval"
          color="#00BFFF"
          height={200}
          width={200}
          timeout={3000} //3 secs
        />
      )}
    </div>
  )
}

export default Pokemon
