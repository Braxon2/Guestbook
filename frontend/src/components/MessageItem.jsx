import "./styles/MessageItem.css";
const MessageItem = ({ message }) => {
  return (
    <div className="item">
      <h2>{message.name}</h2>
      <p>{message.message}</p>
      <p>{new Date(message.created_at).toLocaleDateString()}</p>
    </div>
  );
};

export default MessageItem;
