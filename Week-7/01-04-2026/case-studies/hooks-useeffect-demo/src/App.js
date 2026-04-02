/*{import React, {usestate, useEffect} from 'react';
import './App.css';

function App() {
  // const [count, setCount] = useState(0);
  // const [text, setText] = useState('');

  // useEffect(() => {
  //   console.log("Effect 1: After Every render")
  // });

  // return (
  //   <div style={Styles.container}>
  //     <h1>Count: {count}</h1>
  //     <button style={Styles.btn} onClick={() => setCount(count + 1)}>
  //       Increment</button>
      
  //     {/* Input Field */
  //     <div style={{marginTop: "20px"}}>
  //       <input
  //         type="text"
  //         value={text}
  //         onChange={(e) => setText(e.target.value)}
  //         placeholder="Type something..."
  //       />
  //     </div>
  //     <p style={Styles.info}>
  //       This effect runs <b>after every render </b>
  //     </p>

  //     <p style={styles.note}>
  //       open console to observe logs.
  //     </p>
  //   </div>
  // );


  /*const [name, setName] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect 2: component mounted");

    //load save name
    const savedName = localStorage.getItem('name');
    if (savedName) {
      setName(savedName);
    }

    //load saved count
    const savedCount = localStorage.getItem('count');
    if (savedCount) {
      setCount(parseInt(savedCount));
    }
}, []);
    useEffect(() => {
      localStorage.setItem('name', name);
      localStorage.setItem('count', count);
    }, [name, count]);
  
    return (
      <div style={Styles.container}>
        <h1>Use Effect - component mount</h1>

        {/* Input Field */
        /*<input
        type='text'
        placeholder='Enter your name'
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

        <h3>Hello, {name || 'Guest'}</h3>

        {/* Counter */
        /*<div>
          <p>Count: {count}</p>

          <button style={Styles.btn} onClick={() => setCount(count + 1)}>
            Increment
          </button>

          <button style={Styles.btn} onClick={() => {
            setName('');
            setCount(0);
            localStorage.clear();
          }}>
            Reset
          </button>

          <p style={Styles.info}>
            Data is saved in <b>local storage</b> and restored on refresh.
          </p>

          <p style={Styles.note}>
            Refresh the page to test persistence.
          </p>
        </div>
        </div>
    );
}

const Styles = {
  container: {
    textalign: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif'
  },
  btn: {
    padding: '10px 20px',
    margin: '5px',
    fontSize: '16px',
    cursor: 'pointer'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '200px'
  },
  info: {
    marginTop: '20px',
    color: '#555'
  },
  note: {
    marginTop: '10px',
    color: '#888',
    fontStyle: 'italic'
  }
};

export default App;*/


import React, { useState, useEffect } from "react";

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");

  // ==================== EFFECT 8: Fetch Data ====================
  useEffect(() => {
    let isMounted = true;

    const fetchPosts = async () => {
      console.log("📡 Effect 8: Fetching posts");

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts?_limit=5"
        );

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();

        if (isMounted) {
          setPosts(data);
          setLoading(false);
        }

      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    fetchPosts();

    return () => {
      console.log("🧹 Cleanup: Cancelling data fetch");
      isMounted = false;
    };
  }, []);

  // ==================== EFFECT 9: Debounced Search ====================
  useEffect(() => {
    console.log(`🔍 Effect 9: Debouncing search: "${searchTerm}"`);

    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  // 🔹 Filtered Posts
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(debouncedTerm.toLowerCase())
  );

  return (
    <div style={styles.container}>
      <h1>API + Debounced Search</h1>

      {/* 🔹 Search */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={styles.input}
      />

      {/* 🔹 Status */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🔹 Posts */}
      <div>
        {filteredPosts.map(post => (
          <div key={post.id} style={styles.card}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      <p style={styles.info}>
        👉 API fetch with cleanup + debounced search (performance optimized)
      </p>

      <p style={styles.note}>
        Open console to see logs 👀
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
  input: {
    padding: "10px",
    width: "250px",
    marginBottom: "20px"
  },
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px auto",
    width: "300px"
  },
  info: {
    marginTop: "20px",
    color: "green"
  },
  note: {
    color: "gray"
  }
};

export default App;