import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "./Styles/Home.css";
import MessageItem from "../components/MessageItem";

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);
  const MESSAGES_PER_PAGE = 10;

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:4000/api/v1/messages?page=${currentPage}&limit=${MESSAGES_PER_PAGE}`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch messages.");
      }

      const result = await response.json();

      if (result.status === "success" && Array.isArray(result.messages)) {
        setMessages(result.messages);
        setTotalPages(result.pagination.totalPages);
        setTotalMessages(result.pagination.totalMessages);
      } else {
        throw new Error("Unexpected data format from server.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCLick = (e) => {
    e.preventDefault();
    navigate("/send-message");
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(1, prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(totalPages, prevPage + 1));
  };

  return (
    <div className="wrapper">
      <div className="welcome-container">
        <h1>Guestbook</h1>

        <p>See what people wrote about us and feel free to leave a message.</p>

        {loading && <div>Loading messages...</div>}
        {error && (
          <div className="error-container">
            <strong>Error!</strong>
            <span> {error}</span>
          </div>
        )}

        <div className="list-of-messages">
          {!loading && !error && messages.length === 0 && (
            <p>No messages found.</p>
          )}
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>

        {!loading && !error && messages.length > 0 && (
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}

        <div className="input-container">
          <button onClick={handleCLick}>Leave a message</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
