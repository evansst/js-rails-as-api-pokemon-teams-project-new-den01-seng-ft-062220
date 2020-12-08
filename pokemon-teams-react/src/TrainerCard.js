import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Pokemon from './Pokemon';
import { POKEMONS_URL, parseJSON } from './utilities';

function TrainerCard({ trainer }) {
  const [pokemons, setPokemons] = useState(trainer.pokemons);
  const { name, id } = trainer;

  const addPokemon = () => {
    if (pokemons.length >= 6) return;

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trainer_id: id,
      }),
    };

    fetch(POKEMONS_URL, options)
      .then(parseJSON)
      .then((newPokemon) => setPokemons([...pokemons, newPokemon]));
  };

  const removePokemon = (pokemonID) => {
    fetch(`${POKEMONS_URL}/${pokemonID}`, {
      method: 'DELETE',
    });

    setPokemons(pokemons.filter((pokemon) => pokemon.id !== pokemonID));
  };

  const toPokemonLi = (pokemon) => (
    <Pokemon
      key={pokemon.id}
      pokemon={pokemon}
      handleClick={removePokemon}
    />
  );

  return (
    <div className="card" data-id={id}>
      <p>{name}</p>
      <button
        type="button"
        hidden={pokemons.length >= 6}
        data-trainer-id={id}
        onClick={addPokemon}
      >
        Add Pokemon
      </button>
      <ul className="team">
        {pokemons.map(toPokemonLi)}
      </ul>
    </div>
  );
}

TrainerCard.propTypes = {
  trainer: PropTypes.instanceOf(Object).isRequired,
};

export default TrainerCard;
