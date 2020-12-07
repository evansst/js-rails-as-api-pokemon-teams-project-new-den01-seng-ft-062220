const BASE_URL = 'http://localhost:3000';
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

const $main = document.querySelector('main');
const parseJSON = (response) => response.json();

const toPokemonLi = ({ nickname, species, id }) => `
  <li>${nickname} (${species})
    <button class="release" data-pokemon-id="${id}" onclick="releasePokemon(event)">Release</button>
  </li>
`;

const toTrainerCard = ({ id, pokemons }) => {
  $main.innerHTML += `
    <div class="card" data-id="${id}">
      <p>Prince</p>
      <button data-trainer-id=${id} onclick="addPokemon(event)">Add Pokemon</button>
      <ul class="team">
        ${pokemons.map(toPokemonLi).join('\n')}
      </ul>
    </div>
  `;
};

const addPokemon = ({ target }) => {
  const trainerId = target.getAttribute('data-trainer-id');
  const $pokemonList = [...target.parentNode.children].find(({ className }) => className === 'team');

  if ($pokemonList.children.length >= 5) {
    target.innerText = 'Team Full!';
    return;
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      trainer_id: trainerId,
    }),
  };

  fetch(POKEMONS_URL, options)
    .then(parseJSON)
    .then((pokemon) => {
      $pokemonList.innerHTML += toPokemonLi(pokemon);
    });
};

const releasePokemon = ({ target }) => {
  const pokemonId = target.getAttribute('data-pokemon-id');

  target.parentNode.remove();

  fetch(`${POKEMONS_URL}/${pokemonId}`, { method: 'DELETE' });
};

fetch(TRAINERS_URL)
  .then(parseJSON)
  .then((trainers) => trainers.map(toTrainerCard));
