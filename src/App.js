import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const [dice, setDice] = useState([]);

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
    console.log(id);
    const newArray = dice.map((item) => {
      if (id === item.id) {
        return { ...item, isHeld: !item.isHeld };
      } else {
        return item;
      }
    });
    setDice(newArray);
  }

  return (
    <main>
      <div className="tenzies-wrapper">
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
