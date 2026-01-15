"use client";

import { useState } from "react";

export default function Home() {
  const [backendMessage, setBackendMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkBackendStatus = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setBackendMessage(data.message);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setBackendMessage(null);
    }
  };

  return (
    <div>
      <h1>Multi-User Todo App – Phase 2 Frontend</h1>
      <button onClick={checkBackendStatus}>Check Backend Status</button>
      {backendMessage && <p>{backendMessage}</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
    </div>
  );
}
