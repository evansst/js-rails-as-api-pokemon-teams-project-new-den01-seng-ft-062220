import React from 'react';
import PropTypes from 'prop-types';

function Pokemon({ pokemon, handleClick }) {
  const { nickname, species, id } = pokemon;

  return (
    <li>
      {`${nickname} (${species})`}
      <button
        type="button"
        className="release"
        data-pokemon-id={id}
        onClick={() => handleClick(id)}
      >
        Release
      </button>
    </li>
  );
}

Pokemon.propTypes = {
  pokemon: PropTypes.instanceOf(Object).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Pokemon;
