import React from 'react'
import { Link } from 'react-router-dom';
import styles from "./PokemonNamesMenu.module.scss"

function PokemonNamesMenu({ pokemons }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <strong style={{ fontSize: "27px", marginBottom: "10px" }}>Menu</strong>
      <ul>{pokemons.map((pokemon, index) => (
        <Link to={`/pokemon/${index + 1}`}>
          <li key={index} className={styles.tab}>
            <div>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</div>
          </li>
        </Link>
      ))}
      </ul>
    </div>
  )
}

export default PokemonNamesMenu
