import React from 'react';
import styles from './App.module.css';
import { Route } from 'react-router-dom';
import Pokemon from './Pokemon.jsx';
import PokemonList from './PokemonList.jsx';

function App() {
  return (
    <div className={styles.app}>
      <Route exact path="/" component={PokemonList} />
      <Route path="/pokemon/:id" component={Pokemon} />
    </div>
  );
}

export default App;
