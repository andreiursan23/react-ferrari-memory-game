import "./SingleCard.scss";

function SingleCard({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img
          src={card.src}
          alt="card-front"
          className="front"
          height="300px"
          width="300px"
        />
        <img
          src="/img/ferrari-logo-back.png"
          alt="card-back"
          onClick={handleClick}
          className="back"
          height="300px"
          width="300px"
        />
      </div>
    </div>
  );
}

export default SingleCard;
