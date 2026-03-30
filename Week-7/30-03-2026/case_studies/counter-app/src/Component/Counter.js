import { useState } from "react";
import react  from "react";

function Counter() {
  const [count, setCount] = react.useState(0);
  const [step, setStep] = react.useState(1);
  const[lastAction, setLastAction] = useState('None');
    const increment = () => {
        setCount(count + step);
        setLastAction('increment by ' + step);
    }
    const decrement = () => {
        setCount(count - step);
        setLastAction('decrement by ' + step);
    }
    const reset = () => {
        setCount(0);
        setStep(1);
        setLastAction('reset to 0');
    }
    return (
        <div style={{
            padding: '20px',
            textAlign: 'center'
        }}>
            <div style={{
                fontSize: '48px',
                margin: '20px'
            }}>
                  <h1>Counter : {count}</h1>
            </div>

            <div style={{
                margin: '20px'
            }}>
                <label >Step:
                    <input type="number" value={step} onChange={(e) => setStep(Number(e.target.value))}
                    style={{marginLeft: '10px', width: '60px'}} />
                 </label>
                
            </div>
            <div>
                <button onClick={increment} style={buttonstyle}>Increment</button>
                <button onClick={decrement} style={buttonstyle} >Decrement</button>
                <button onClick={reset} style={buttonstyle} >Reset</button>
            </div> 

            <div style={{
                marginTop: '20px',
                fontStyle: 'italic'
            }}>
                Last Action: {lastAction}
            </div>
        </div>
    )
}

const buttonstyle = {
    margin: '0 10px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px'
};

export default Counter;