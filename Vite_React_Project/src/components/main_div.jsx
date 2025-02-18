import { useState } from "react";
import "../styles/main_div.css";

function Main() {
  const [valueA, setValueA] = useState(0);
  const [valueB, setValueB] = useState(0);
  const [operation, setOperation] = useState(null);
  const [result, setResult] = useState(null);

  const handleOperation = (op) => {
    setOperation(op);
    let res;
    switch (op) {
      case "+":
        res = valueA + valueB;
        break;
      case "-":
        res = valueA - valueB;
        break;
      case "*":
        res = valueA * valueB;
        break;
      case "/":
        res = valueB !== 0 ? valueA / valueB : "Error";
        // limitar a 2 decimales
        if (typeof res === "number") {
          res = res.toFixed(2);
        }
        break;
      default:
        res = null;
    }
    setResult(res);
  };

  return (
    <main id="main_div">
      <h1>Calculadora</h1>
      <div className="container">
        <input
          type="number"
          value={valueA}
          onChange={(e) => setValueA(Number(e.target.value))}
          placeholder="A"
        />
        <input
          type="number"
          value={valueB}
          onChange={(e) => setValueB(Number(e.target.value))}
          placeholder="B"
        />
        <div className="buttons">
          {["+", "-", "*", "/"].map((op) => (
            <button
              key={op}
              onClick={() => handleOperation(op)}
              className={operation === op ? "active" : ""}
            >
              {op}
            </button>
          ))}
        </div>
        <div className="result">
          <h3>Resultado: {result !== null ? result : "N/A"}</h3>
        </div>
      </div>
    </main>
  );
}

export default Main;
