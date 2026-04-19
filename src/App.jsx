import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = async (e) => {
    e.preventDefault();
    console.log("Input:", input);

    try {
      const res = await fetch("http://localhost:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ question: input })
      });

      const data = await res.json();
      setResponse(data.finalData);

    } catch (error) {
      console.log(error);
      setResponse("Error fetching response");
    }
  };

  return (
    <div className="container">
      <div className="card">

        <div className="header">
          Gemini AI Chat App
        </div>

        <div className="body">

          {/* Left */}
          <div className="left">
            <textarea
              placeholder="Type your prompt here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>

            <button onClick={handleGenerate}>
              Generate
            </button>
          </div>

          {/* Right */}
          <div className="right">
            {response || "Response will appear here..."}
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;