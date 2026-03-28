import React from "react";

function Card({ title, content,icon , isFeatured = false}) {
  return (
    <div style={{
        border: isFeatured ? '2px solid gold' : '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        margin: '10px', 
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        backgroundColor:  '#fff',
        width: '300px',
    }}>
      {icon && <div style={{ fontSize: '40px'}}>{icon}</div>}
      <h3>{title}</h3>  
        <p>{content}</p>
    </div>
    );  
}

export default Card;
