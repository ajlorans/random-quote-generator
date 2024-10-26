import { useState, useEffect } from "react";
import Quote from "./Quote.jsx"; // Ensure this path is correct
import "./App.css"; // Ensure the path is correct

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false); // New loading state
  const [error, setError] = useState(""); // New error state

  const fetchQuote = async () => {
    setLoading(true); // Set loading to true when fetching starts
    setError(""); // Reset error message before fetching
    try {
      const response = await fetch(
        `https://api.allorigins.win/get?url=https://zenquotes.io/api/random?ts=${new Date().getTime()}`
      );
      const data = await response.json();
      const jsonData = JSON.parse(data.contents); // Parse the nested JSON
      setQuote(jsonData[0].q); // Get the quote
      setAuthor(jsonData[0].a); // Get the author
    } catch (error) {
      console.error("Error fetching the quote:", error);
      setError("Failed to fetch new quote. Please try again."); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    fetchQuote(); // Fetch a quote on initial render
  }, []);

  return (
    <div>
      <h1>Random Quote Generator</h1> {/* Title for the app */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p> // Display error message
      ) : (
        <Quote quote={quote} author={author} />
      )}
      <button onClick={fetchQuote}>New Quote</button>
    </div>
  );
}

export default App;
