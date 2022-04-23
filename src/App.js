import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ReactConfetti from "react-confetti";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);
  const [countRoll, setCountRoll] = useState(0);
  const [time, setTime] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [record, setRecord] = useState(
    () => JSON.parse(localStorage.getItem("record")) || 0
  );
  const [start, setStart] = useState(false);

  useEffect(() => {
    localStorage.setItem("record", JSON.stringify(record));
  }, [record]);

  function allNewDie() {
    const array = [];
    for (let i = 0; i < 10; i++) {
      let ranNumber = Math.ceil(Math.random() * 6);
      array.push({ value: ranNumber, isHeld: false, id: nanoid() });
    }
    setDice(array);
  }

  useEffect(() => {
    allNewDie();
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(intervalId);
  }, [start]);

  function handleRoll(e) {
    setCountRoll((prevRoll) => prevRoll + 1);
    const newRollArray = [];
    dice.map((item) => {
      if (item.isHeld === true) {
        return newRollArray.push(item);
      } else {
        let ranNumber = Math.ceil(Math.random() * 6);
        return newRollArray.push({ ...item, value: ranNumber, id: nanoid() });
      }
    });
    setDice(newRollArray);
    if (tenzies) {
      setTenzies(false);
      allNewDie();
      setTime(0);
      setCountRoll(0);
    }
    if (e.target.textContent === "New Game") {
      setStart(true);
    }
  }

  function holdDice(id) {
    const newArray = dice.map((item) => {
      if (id === item.id) {
        return { ...item, isHeld: !item.isHeld };
      } else {
        return item;
      }
    });
    setDice(newArray);
  }

  useEffect(() => {
    // check if all dice are held
    const allDiceHeld = dice.filter((item) => item.isHeld === true);
    // check if all dice have the same value
    const allNumber = dice.map((item) => item.value);
    const totalNumber = allNumber.reduce((total, current) => {
      return total + current;
    }, 0);
    if (allDiceHeld.length === 10 && allNumber[0] * 10 === totalNumber) {
      setTenzies(true);
      console.log("You won!");
      clearInterval(intervalId);
      if (record === 0) {
        setRecord(time);
      }
      if (time < record) {
        setRecord(time);
      }
    }
  }, [dice]);

  return (
    <>
      <h2>🕓 Timer: {time} sec</h2>
      <main>
        {tenzies && <ReactConfetti />}
        <div className="tenzies-wrapper">
          <h1 className="title">Tenzies</h1>
          <p className="instructions">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <section className="die-wrapper">
            {dice.map((item) => {
              return (
                <Die
                  value={item.value}
                  key={item.id}
                  isHeld={item.isHeld}
                  holdDice={() => holdDice(item.id)}
                />
              );
            })}
          </section>
          <button onClick={handleRoll}>{tenzies ? "New Game" : "Roll"}</button>
        </div>
      </main>
      <h4>Fastest record: {record} sec</h4>
      <h4>Number of rolls: {countRoll}</h4>
    </>
  );
}

export default App;
