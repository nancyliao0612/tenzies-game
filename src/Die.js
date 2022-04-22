function Die({ value, isHeld, holdDice }) {
  return (
    <div
      style={{ background: isHeld === true ? "#59E391" : "white" }}
      onClick={holdDice}
    >
      {value}
    </div>
  );
}

export default Die;
