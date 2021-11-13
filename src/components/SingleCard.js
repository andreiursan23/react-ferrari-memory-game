import "./SingleCard.scss";

function SingleCard({ card, saveChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      saveChoice(card);
    }
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className={flipped ? "flipped" : ""}>
        <img
          src={card.src}
          alt="Front of the card with Ferrari cars"
          className="front"
        />
        <img
          src=".\img\ferrari-logo-back.png"
          alt="Ferrari logo, back of the card"
          className="back"
        />
      </div>
    </div>
  );
}

export default SingleCard;
