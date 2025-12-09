import React, { useState } from 'react';
import MessageBubble from './MessageBubble';


function ChatWindow({ messages, onSend }) {
const [input, setInput] = useState('');


const handleSubmit = () => {
if (!input.trim()) return;
onSend(input);
setInput('');
};


return (
<div className="chat-window">
<div className="messages-area">
{messages.map((msg, idx) => (
<MessageBubble key={idx} sender={msg.sender} text={msg.text} />
))}
</div>


<div className="input-area">
<input
type="text"
value={input}
placeholder="Ask something..."
onChange={(e) => setInput(e.target.value)}
onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
/>
<button onClick={handleSubmit}>Send</button>
</div>
</div>
);
}


export default ChatWindow;