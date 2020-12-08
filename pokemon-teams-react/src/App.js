import React, { useEffect, useState } from 'react';
import TrainerCard from './TrainerCard';
import { TRAINERS_URL, parseJSON } from './utilities';

function App() {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    fetch(TRAINERS_URL)
      .then(parseJSON)
      .then(setTrainers);
  }, []);

  const toTrainerCard = (trainer) => <TrainerCard key={trainer.id} trainer={trainer} />;

  return (
    <>
      <header>
        <h2>Pokemon Teams!</h2>
      </header>

      <main>
        {trainers.map(toTrainerCard)}
      </main>
    </>
  );
}

export default App;
