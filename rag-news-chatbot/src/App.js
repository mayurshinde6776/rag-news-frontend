import React, { useState, useEffect } from 'react';
import ChatWindow from './components/ChatWindow';
import { sendMessageAPI, resetSessionAPI, fetchHistoryAPI } from './api';


function App() {
const [messages, setMessages] = useState([]);
const [sessionId, setSessionId] = useState(() => localStorage.getItem('sessionId'));


// Create new session if none exists
useEffect(() => {
if (!sessionId) {
const newSession = `session_${Date.now()}`;
setSessionId(newSession);
localStorage.setItem('sessionId', newSession);
}
}, []);


// Load chat history
useEffect(() => {
async function loadHistory() {
if (sessionId) {
const history = await fetchHistoryAPI(sessionId);
setMessages(history || []);
}
}
loadHistory();
}, [sessionId]);


// Handle sending a new message
const handleSend = async (text) => {
const userMsg = { sender: 'user', text };
setMessages(prev => [...prev, userMsg]);


const botResponse = await sendMessageAPI(text, sessionId);
setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
};


// Reset session
const reset = async () => {
if (sessionId) {
await resetSessionAPI(sessionId);
}
const newSession = `session_${Date.now()}`;
setSessionId(newSession);
localStorage.setItem('sessionId', newSession);
setMessages([]);
};


return (
<div className="app-container">
<h2>RAG News Chatbot</h2>
<button className="reset-btn" onClick={reset}>Reset Session</button>
<ChatWindow messages={messages} onSend={handleSend} />
</div>
);
}


export default App;