/*import React, {useState} from 'react';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);

  // return (
  //   <div style={Styles.container}>
  //     <h1>Counter App</h1>
  //     <h2>{count}</h2>
  //     <button style={Styles.btn} onClick={() => setCount(prevCount => prevCount + 1)}>
  //       Increment
  //       </button>
  //     <button style={Styles.btn} onClick={() => setCount(prevCount => prevCount - 1)}>
  //       Decrement
  //       </button>
  //   </div>
  // );

  // // Step 1: Basic State
  // const [count, setCount] = useState(0);

  // //step 2: Functional Update
  // const increment = () => {
  //   setCount(prevCount => prevCount + 1);
  // };

  // const incrementByTwo = () => {
  //   setCount(prevCount => prevCount + 2);
  // };

  // const resetCount = () => {
  //   setCount(0);
  // };

  // return (
  //   <div style={Styles.container}>
  //     <h1>Functional update Demo</h1>
  //     <h2>{count}</h2>
  //     <div>
  //       <button style={Styles.btn} onClick={increment}>
  //         +1
  //       </button>
  //       <button style={Styles.btn} onClick={incrementByTwo}>
  //         +2
  //       </button>
  //       <button style={Styles.btn} onClick={resetCount}>
  //         Reset
  //       </button>
  //     </div>
  //     <p style={Styles.info}>Using <b>prev state</b> ensures correct updates when multiple updates happen quickly.
  //     </p>
  //     </div>
  // );

  //Lazy initialization (runs only once)
  // const [data, setData] = useState(() => {
  //   console.log('Expensive computation running...');
    
  //   let result = 0 ;
  //   for (let i = 0; i < 10000000; i++) {
  //     result += i;
  //   }
  //   return result%1000;
  // });

  // //update without re-running expensive computation
  // const recalculateData = () => {
  //   setData(prevData => {
  //     console.log("Recalculating data...");
  //     return prevData+100;
  //   });
  // };

  // return (
  //   <div style={Styles.container}>
  //     <h1>Lazy Initialization Demo</h1>
  //     <h2>Computed Value: {data}</h2>
  //     <button style={Styles.btn} onClick={recalculateData}>
  //       Recalculate Data
  //     </button>
  //     <p style={Styles.info}>
  //       Open console to observe logs.</p>
  //   </div>
  // );

  //Object State
  /*const [user, setUser] = useState({
    name: '',
    age: '',
    email: '',
  });

  //update Functions
  const updateUserName = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      name: value,
    }));
  };

  const updateUserAge = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      age: value,
    }));
  };

  const updateUserEmail = (value) => {
    setUser(prevUser => ({
      ...prevUser,
      email: value,
    }));
  };

  const resetUser = () => {
    setUser({
      name: '',
      age: '',
      email: '',
    });
  };

  return (
    <div>
      <div style={Styles.container}>
        <h1>Object State Demo</h1>

        
        <input
        type='text'
        placeholder='Enter Name'
        onChange={(e) => updateUserName(e.target.value)}
        style={Styles.input}
        />
        
        <input 
        type='text'
        placeholder='Enter Age'
        onChange={(e) => updateUserAge(e.target.value)}
        style={Styles.input}
        />
  
        <input
        type='email'
        placeholder='Enter Email'
        onChange={(e) => updateUserEmail(e.target.value)}
        style={Styles.input}
        />

        
        <div style={Styles.userInfo}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Age:</b> {user.age}</p>
          <p><b>Email:</b> {user.email}</p>
        </div>

        
        <button style={Styles.btn} onClick={resetUser}>
          Reset User
        </button>
      </div>
    </div>
  );*/


  // array state
 /* const [items, setItems] = useState([]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Item ${items.length + 1}`,
      createdAt: new Date().toLocaleTimeString(),
    }
    setItems(prevItems => [...prevItems, newItem]);
  };

  const addMultipleItems = () => {
    const newItems = [
      {
        id: Date.now(),
        name: `Item ${items.length + 1}`,
        createdAt: new Date().toLocaleTimeString(),
      },
      {
        id: Date.now() + 1,
        name: `Item ${items.length + 2}`,
        createdAt: new Date().toLocaleTimeString(),
      },
      {
        id: Date.now() + 2,
        name: `Item ${items.length + 3}`,
        createdAt: new Date().toLocaleTimeString(),
      },
    ];
    
    setItems(prevItems => [...prevItems, ...newItems]);
  };

  //update item

  const updateItemName = (id) => {
    setItems(prevItems => prevItems.map(item => 
      item.id === id ? {...item, name : "Updated Item", updated: new Date().toLocaleString()} : item
    ));
  }

  //delete item
  const deleteItem = (id) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  //delete all items
  const clearItems = () => {
    setItems([]);
  };

  return (
    <div style={Styles.container}>
      <h1>Array State Demo</h1>
      <button style={Styles.btn} onClick={addItem}>
        Add Item
      </button>
      <button style={Styles.btn} onClick={addMultipleItems}>
        Add Multiple Items
      </button>
      <button style={Styles.btn} onClick={clearItems}>
        Clear Items
      </button>

      <ul style={Styles.itemList}>
        {items.map(item => (
          <li key={item.id} style={Styles.item}>
            <span>{item.name} (Created: {item.createdAt})</span>
            {item.updated && <span> (Updated: {item.updated})</span>}
            <div>
              <button style={Styles.btn} onClick={() => updateItemName(item.id)}>
                Update Name
              </button>
              <button style={Styles.btn} onClick={() => deleteItem(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const Styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  btn: {
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
  },
};

export default App;*/


import React, { useReducer, useState } from "react";

function App() {

  // 🔹 Initial State
  const initialCounterState = {
    count: 0,
    history: []
  };

  // 🔹 Reducer Function
  function counterReducer(state, action) {
    switch (action.type) {
      case "increment":
        return {
          count: state.count + 1,
          history: [
            ...state.history,
            { type: "increment", value: state.count + 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "decrement":
        return {
          count: state.count - 1,
          history: [
            ...state.history,
            { type: "decrement", value: state.count - 1, time: new Date().toLocaleTimeString() }
          ]
        };

      case "reset":
        return {
          count: 0,
          history: [
            ...state.history,
            { type: "reset", value: 0, time: new Date().toLocaleTimeString() }
          ]
        };

      case "set":
        return {
          count: action.payload,
          history: [
            ...state.history,
            { type: "set", value: action.payload, time: new Date().toLocaleTimeString() }
          ]
        };

      default:
        return state;
    }
  }

  // 🔹 useReducer Hook
  const [counterState, dispatch] = useReducer(counterReducer, initialCounterState);

  // 🔹 Input State for SET
  const [inputValue, setInputValue] = useState("");

  return (
    <div style={styles.container}>
      <h1>useReducer Counter (Advanced)</h1>

      <h2>Count: {counterState.count}</h2>

      {/* 🔹 Actions */}
      <div>
        <button style={styles.btn} onClick={() => dispatch({ type: "increment" })}>
          +1
        </button>

        <button style={styles.btn} onClick={() => dispatch({ type: "decrement" })}>
          -1
        </button>

        <button style={styles.resetBtn} onClick={() => dispatch({ type: "reset" })}>
          Reset
        </button>
      </div>

      {/* 🔹 Set Value */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />

        <button
          style={styles.btn}
          onClick={() =>
            dispatch({ type: "set", payload: Number(inputValue) })
          }
        >
          Set Value
        </button>
      </div>

      {/* 🔹 History */}
      <h3 style={{ marginTop: "30px" }}>History</h3>

      <ul style={styles.list}>
        {counterState.history.map((item, index) => (
          <li key={index} style={styles.card}>
            <b>{item.type.toUpperCase()}</b> → {item.value}
            <br />
            <small>{item.time}</small>
          </li>
        ))}
      </ul>

      <p style={styles.info}>
        👉 useReducer is best for <b>complex state logic & history tracking</b>
      </p>
    </div>
  );
}

// 🎨 Styling
const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
    fontFamily: "Arial"
  },
  btn: {
    margin: "10px",
    padding: "10px 15px",
    cursor: "pointer"
  },
  resetBtn: {
    margin: "10px",
    padding: "10px 15px",
    backgroundColor: "red",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  input: {
    padding: "10px",
    marginRight: "10px"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  card: {
    border: "1px solid #ccc",
    margin: "10px auto",
    padding: "10px",
    width: "250px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  }
};

export default App;