import React, { useState, useEffect } from 'react';
import styles from './PokemonList.module.scss';
import { Link } from 'react-router-dom';
import PokemonNamesMenu from './PokemonNamesMenu.jsx';
import Loader from 'react-loader-spinner';

function PokemonList() {
  const [pokemons, setPokemons] = useState([])

  useEffect(() => {
    async function getApi() {
      await fetch('https://pokeapi.co/api/v2/pokemon/?limit=32')
        .then(response => response.json())
        .then(data => {
          let results = data.results;
          let promisesArray = results.map(result => {
            return fetch(result.url).then(response => response.json());
          })
          return Promise.all(promisesArray);
        }).then((data) => setPokemons(data));
    }

    getApi()
  }, []);

  return (
    <div style={{ display: "flex", height: "100px", width: "100%" }}>
      <PokemonNamesMenu pokemons={pokemons} />
      {pokemons.length ? <div className={styles.pokemons}>{pokemons.map((pokemon, index) => (
        <>
          {pokemon ? (<Link to={`/pokemon/${index + 1}`}>
            <div className={styles.pokemons__pokemon} key={index}>
              <div>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
              <img src={pokemon.sprites.front_default} />
            </div>
          </Link>) : (
            <Loader
              type="Oval"
              color="#00BFFF"
              height={100}
              width={100}
              timeout={1000}
            />
          )}
        </>
      ))}
      </div> : (
        <div className={styles.loader}>
          <Loader
            type="Oval"
            color="#00BFFF"
            height={400}
            width={400}
            timeout={3000}
          />
        </div>
      )}
    </div>
  )
}

export default PokemonList
