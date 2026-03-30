import { useState } from "react";

function ThemeToggleApp() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  // styles based on theme
  const appStyle = {
    backgroundColor: isDark ? "#121212" : "#ffffff",
    color: isDark ? "#ffffff" : "#000000",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.3s ease"
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    marginTop: "20px",
    cursor: "pointer"
  };

  return (
    <div style={appStyle}>
      <h1>Theme Toggle App</h1>

      {/* Display current mode */}
      <h2>Mode: {isDark ? "Dark" : "Light"}</h2>

      {/* Toggle Button */}
      <button onClick={toggleTheme} style={buttonStyle}>
        {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default ThemeToggleApp;