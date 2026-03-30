
import './App.css';
import Counter from './Component/Counter';
import StateVsPropsDemo from './Component/StateVsPropsDemo';
import TemperatureConverter from './Component/TemperatureCounter';

function App() {
  return (
    <div className="App">
      <h1 style={{textAlign: 'center', color: '#333'}}>React Demo Applications</h1>
      
      <section style={{marginBottom: '40px'}}>
        <h2 style={{textAlign: 'center', color: '#555'}}>Counter App</h2>
        <Counter />
      </section>

      <section style={{marginBottom: '40px'}}>
        <h2 style={{textAlign: 'center', color: '#555'}}>State vs Props Demo</h2>
        <StateVsPropsDemo />
      </section>

      <section style={{marginBottom: '40px'}}>
        <h2 style={{textAlign: 'center', color: '#555'}}>Temperature Converter</h2>
        <TemperatureConverter />
      </section>
    </div>
  );
}

export default App;
