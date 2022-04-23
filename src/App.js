import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState([]);
  const [tenzies, setTenzies] = useState(false);

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
  }, []);

  function handleRoll() {
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
    }
  }, [dice]);

  return (
    <main>
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
        <button onClick={handleRoll}>Roll</button>
      </div>
    </main>
  );
}

export default App;
