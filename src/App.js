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

  // Create cards array and shuffle it
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => 0.5 - Math.random())
      .map((elem) => {
        return { ...elem, id: Math.random() };
      });

    setCards(shuffledCards);
    setTurns(0);
  };

  // Save choice after clicking on card
  const saveChoice = (choice) => {
    choiceOne ? setChoiceTwo(choice) : setChoiceOne(choice);
  };

  // Compare choices
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
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Automatically start game on mount
  useEffect(() => {
    shuffleCards();
  }, []);

  console.log(cards);

  // Reset choices after comparing a pair
  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>
        Ferrari Memory Car<strong className="special-color">(d)</strong>s
      </h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            saveChoice={saveChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <div>Turns: {turns}</div>
    </div>
  );
}

export default App;
