import { useState } from "react";

function Counter() {
  // Initialize state for the count
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        Current Count: {count}
      </p>
      <div>
        <button
          style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          style={{ margin: "5px", padding: "10px 20px", fontSize: "16px" }}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>
        <button
          style={{
            margin: "5px",
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "red",
            color: "white",
          }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;
