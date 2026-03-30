import React, {useState} from "react";

// Child Component: Demonstrates both State (internal) and Props (received from parent)
function DisplayCard({title, value, onChange}) {
    // LOCAL STATE - This is the component's own state (not shared with parent)
    const [internalCount, setInternalCount] = useState(0);

    return (
        <div style={{
            border: "2px solid #333", 
            borderRadius: "8px", 
            padding: "15px", 
            margin: "10px", 
            width: "250px",
            backgroundColor: "#f0f0f0"
        }}>
            <h3>{title}</h3>
            
            {/* PROPS: Value received from parent component */}
            <div style={{marginBottom: "10px", padding: "10px", backgroundColor: "lightblue", borderRadius: "5px"}}>
                <p><strong>Props from Parent:</strong> {value}</p>
            </div>
            
            {/* LOCAL STATE: This component's own internal state */}
            <div style={{marginBottom: "10px", padding: "10px", backgroundColor: "lightyellow", borderRadius: "5px"}}>
                <p><strong>Local State:</strong> {internalCount}</p>
            </div>
            
            <button 
                onClick={() => setInternalCount(internalCount + 1)}
                style={{padding: "8px 12px", marginRight: "10px", backgroundColor: "#FFD700", cursor: "pointer"}}
            >
                Update Local State
            </button>
            
            <button 
                onClick={() => onChange(value + 1)}
                style={{padding: "8px 12px", backgroundColor: "#90EE90", cursor: "pointer"}}
            >
                Update Parent State
            </button>
        </div>
    );
}

// Parent Component: Manages shared state that flows down as props to children
function StateVsPropsDemo() {
    // PARENT STATE - This state is managed here and shared with child components as props
    const [parentCount, setParentCount] = useState(0);
    const [parentStep, setParentStep] = useState(1);
    const [displayColor, setDisplayColor] = useState("lightblue");

    // Function to update parent count
    const handleParentCountChange = (newValue) => {
        setParentCount(newValue);
        // Change color based on even/odd
        setDisplayColor(newValue % 2 === 0 ? "lightblue" : "lightcoral");
    };

    return (
        <div style={{padding: '20px', backgroundColor: "#e8f4f8", borderRadius: "10px", margin: "20px"}}>
            <h2>State vs Props Demo</h2>
            
            {/* Parent State Display */}
            <div style={{backgroundColor: "white", padding: "15px", borderRadius: "8px", marginBottom: "20px"}}>
                <h3>Parent Component State:</h3>
                <p><strong>Parent Count (shared with children):</strong> {parentCount}</p>
                <p><strong>Parent Step:</strong> {parentStep}</p>
                <p><strong>Display Color:</strong> {displayColor}</p>
            </div>

            {/* Buttons to modify parent state */}
            <div style={{marginBottom: "20px"}}>
                <button 
                    onClick={() => setParentStep(parentStep + 1)}
                    style={{padding: "10px 15px", marginRight: "10px", backgroundColor: "#87CEEB", cursor: "pointer", borderRadius: "5px"}}
                >
                    Increase Step (Current: {parentStep})
                </button>
                <button 
                    onClick={() => setDisplayColor(displayColor === 'lightblue' ? 'lightcoral' : 'lightblue')}
                    style={{padding: "10px 15px", backgroundColor: "#DDA0DD", cursor: "pointer", borderRadius: "5px"}}
                >
                    Toggle Display Color
                </button>
            </div>

            {/* Child Components - These receive parent state as props */}
            <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
                <div style={{backgroundColor: displayColor, padding: "10px", borderRadius: "8px", margin: "5px"}}>
                    <DisplayCard
                        title="Child Component 1" 
                        value={parentCount} 
                        onChange={handleParentCountChange}
                    />
                </div>
                <div style={{backgroundColor: displayColor, padding: "10px", borderRadius: "8px", margin: "5px"}}>
                    <DisplayCard
                        title="Child Component 2" 
                        value={parentCount} 
                        onChange={handleParentCountChange}
                    />
                </div>
            </div>

        </div>
    );
}
   

export default StateVsPropsDemo;