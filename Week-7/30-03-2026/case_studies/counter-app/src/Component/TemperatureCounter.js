// src/components/TemperatureConverter.js
import React, { useState } from 'react';

// Child component 1 - Celsius input
function CelsiusInput({ temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      onTemperatureChange('');
    } else {
      const celsius = parseFloat(value);
      if (!isNaN(celsius)) {
        onTemperatureChange(celsius);
      }
    }
  };
  
  return (
    <div style={inputGroupStyle}>
      <label>Celsius:</label>
      <input
        type="number"
        value={temperature === '' ? '' : temperature}
        onChange={handleChange}
        placeholder="Enter temperature in °C"
        style={inputStyle}
      />
      <span>°C</span>
    </div>
  );
}

// Child component 2 - Fahrenheit input
function FahrenheitInput({ temperature, onTemperatureChange }) {
  const handleChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      onTemperatureChange('');
    } else {
      const fahrenheit = parseFloat(value);
      if (!isNaN(fahrenheit)) {
        onTemperatureChange(fahrenheit);
      }
    }
  };
  
  return (
    <div style={inputGroupStyle}>
      <label>Fahrenheit:</label>
      <input
        type="number"
        value={temperature === '' ? '' : temperature}
        onChange={handleChange}
        placeholder="Enter temperature in °F"
        style={inputStyle}
      />
      <span>°F</span>
    </div>
  );
}

// Temperature display component
function TemperatureDisplay({ celsius, fahrenheit }) {
  const getBoilingStatus = (celsius) => {
    if (celsius === '') return 'Enter a temperature';
    if (celsius >= 100) return '💧 Water boils at very high temperature!';
    if (celsius <= 0) return '❄️ Water freezes at very low temperature!';
    return '👍 Normal water temperature';
  };
  
  return (
    <div style={displayStyle}>
      <h3>Temperature Information:</h3>
      <p><strong>Celsius:</strong> {celsius !== '' ? `${celsius}°C` : 'Not set'}</p>
      <p><strong>Fahrenheit:</strong> {fahrenheit !== '' ? `${fahrenheit}°F` : 'Not set'}</p>
      <p style={{
        padding: '10px',
        backgroundColor: '#f0f0f0',
        borderRadius: '4px',
        fontWeight: 'bold'
      }}>
        {getBoilingStatus(celsius)}
      </p>
    </div>
  );
}

// Parent component - state is lifted here
function TemperatureConverter() {
  // State lives in the parent component
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  
  // Conversion functions
  const toCelsius = (fahrenheit) => (fahrenheit - 32) * 5 / 9;
  const toFahrenheit = (celsius) => (celsius * 9 / 5) + 32;
  
  // Handle Celsius changes
  const handleCelsiusChange = (celsiusValue) => {
    setCelsius(celsiusValue);
    if (celsiusValue === '') {
      setFahrenheit('');
    } else {
      setFahrenheit(toFahrenheit(celsiusValue).toFixed(1));
    }
  };
  
  // Handle Fahrenheit changes
  const handleFahrenheitChange = (fahrenheitValue) => {
    setFahrenheit(fahrenheitValue);
    if (fahrenheitValue === '') {
      setCelsius('');
    } else {
      setCelsius(toCelsius(fahrenheitValue).toFixed(1));
    }
  };
  
  return (
    <div style={containerStyle}>
      <h1>🌡️ Temperature Converter</h1>
      <p style={infoStyle}>
        <strong>💡 Lifting State Up Pattern:</strong> Both inputs share the same state
        managed by the parent component. When either input changes, the parent updates
        both values and re-renders both inputs.
      </p>
      
      <div style={converterStyle}>
        <CelsiusInput 
          temperature={celsius}
          onTemperatureChange={handleCelsiusChange}
        />
        
        <FahrenheitInput 
          temperature={fahrenheit}
          onTemperatureChange={handleFahrenheitChange}
        />
      </div>
      
      <TemperatureDisplay 
        celsius={celsius}
        fahrenheit={fahrenheit}
      />
      
      <div style={explanationStyle}>
        <h4>🎯 Why lift state up?</h4>
        <ul>
          <li>✅ Single source of truth - temperature data is stored in one place</li>
          <li>✅ Both inputs stay synchronized automatically</li>
          <li>✅ Easy to add more components that need temperature data</li>
          <li>✅ Calculations are centralized and consistent</li>
        </ul>
      </div>
    </div>
  );
}

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '20px'
};

const infoStyle = {
  backgroundColor: '#e7f3ff',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '20px'
};

const converterStyle = {
  backgroundColor: '#f8f9fa',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '20px'
};

const inputGroupStyle = {
  marginBottom: '15px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const inputStyle = {
  flex: 1,
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px'
};

const displayStyle = {
  backgroundColor: '#e9ecef',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '20px'
};

const explanationStyle = {
  backgroundColor: '#d4edda',
  padding: '15px',
  borderRadius: '8px'
};

export default TemperatureConverter;