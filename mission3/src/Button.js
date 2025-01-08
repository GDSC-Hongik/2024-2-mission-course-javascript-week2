import React from "react";

function Button({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 20px",
        margin: "10px",
        marginTop: "20px",
        cursor: "pointer",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
      }}
    >
      {label}
    </button>
  );
}

export default Button;
