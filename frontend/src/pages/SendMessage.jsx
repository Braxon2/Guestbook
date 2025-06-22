import { useState } from "react";

const SendMessage = () => {
  const [name, setName] = useState("");
  const [textMessage, setTextMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const messageData = {
        name,
        message: textMessage,
      };

      const res = await fetch("http://localhost:4000/api/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(messageData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || `Error: ${res.status}`);
        return;
      }

      if (data.status === "success") {
        setSuccess("Message sent successfully!");
        setIsSubmitted(true);
        setName("");
        setTextMessage("");
      } else {
        setError(data.message || "Failed to send message");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="input-container">
      <form onSubmit={handleClick}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading || isSubmitted}
          />
        </div>

        <div>
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            id="message"
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            disabled={loading || isSubmitted}
            rows="4"
          />
        </div>

        <button type="submit" disabled={loading || isSubmitted}>
          {loading ? "Sending..." : isSubmitted ? "Message Sent" : "Post"}
        </button>

        {loading && <p className="loading-text">sending...</p>}

        {success && (
          <div className="success-message">
            <p style={{ color: "green" }}>success</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p style={{ color: "red" }}>failed</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SendMessage;
