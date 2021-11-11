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
          minHeight="300px"
          minWidth="300px"
        />
        <img
          src="/img/ferrari-logo-back.png"
          alt="card-back"
          onClick={handleClick}
          className="back"
          minHeight="300px"
          minWidth="300px"
        />
      </div>
    </div>
  );
}

export default SingleCard;
