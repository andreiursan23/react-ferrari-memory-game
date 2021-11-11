import "./App.scss";
import { useState, useEffect } from "react";
import SingleCard from "./components/SingleCard";

const cardImages = [
  { src: "/img/ferrari-f12tdf.png", matched: false },
  { src: "/img/ferrari-f50.png", matched: false },
  { src: "/img/ferrari-lights.png", matched: false },
  { src: "/img/ferrari-steering-wheel.png", matched: false },
  { src: "/img/ferrari-tributo.png", matched: false },
  { src: "/img/ferrari-yellow-rim.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // sort the array to make sure the order is random
      .map((card) => ({ ...card, id: Math.random() })); // add an id to each element

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setTurns((prevTurns) => prevTurns + 1);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h1>
        Ferrari Memory Car<strong className="special-color">(d)</strong>s
      </h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div>
        <strong>Turns: {turns}</strong>
      </div>
    </div>
  );
}

export default App;
