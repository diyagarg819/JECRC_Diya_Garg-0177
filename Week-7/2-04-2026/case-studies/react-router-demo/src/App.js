import { BrowserRouter, NavLink , Route} from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Contact from './Pages/Contact';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav  style = {styles.nav}>
          
              <NavLink to="/" style={styles.link}>Home</NavLink>
            
              <NavLink to="/about" style={styles.link}>About</NavLink>
            
              <NavLink to="/contact" style={styles.link}>Contact</NavLink>
        </nav>
        

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>


      </div>
    </BrowserRouter>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: '10px',
  },
  link: ({isActive}) => ({  
    textdecoration: 'none',
    color: isActive ? 'red' : 'black',
    margin: '0 15px',
    fontSize: '18px',
    fontWeight: isActive ? 'bold' : 'normal',
  }),
};

export default App;
