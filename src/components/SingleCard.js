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
          width="200px"
        />
        <img
          src="/img/ferrari-logo-back.png"
          alt="card-back"
          onClick={handleClick}
          className="back"
          width="200px"
        />
      </div>
    </div>
  );
}

export default SingleCard;
