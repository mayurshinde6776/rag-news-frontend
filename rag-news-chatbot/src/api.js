const API_BASE = "http://localhost:5000"; // your backend express server


export async function sendMessageAPI(message, sessionId) {
const res = await fetch(`${API_BASE}/chat`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ message, sessionId })
});
const data = await res.json();
return data.response;
}


export async function fetchHistoryAPI(sessionId) {
const res = await fetch(`${API_BASE}/history/${sessionId}`);
const data = await res.json();
return data.history;
}


export async function resetSessionAPI(sessionId) {
await fetch(`${API_BASE}/reset/${sessionId}`, { method: 'POST' });
}