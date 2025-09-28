const baseUrl = "ws://localhost:3002/ws/user";

// Dummy JWT token for testing. In a real scenario, this would be a valid token.
// This token has a payload of: { "userId": 123, "role": "USER", "sessionId": "some-session-id" }
const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6IlVTRVIiLCJzZXNzaW9uSWQiOiJzb21lLXNlc3Npb24taWQifQ.some-signature";

const wsUrl = `${baseUrl}?auth_token=${authToken}`;

const socket = new WebSocket(wsUrl);

socket.onopen = () => {
    console.log("WebSocket connection established.");

    // Send a ping message every 10 seconds to keep the connection alive
    setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) {
            console.log("Sending ping...");
            socket.send("ping");
        }
    }, 10000);
};

socket.onmessage = (event) => {
    console.log("Message from server:", event.data);
};

socket.onclose = (event) => {
    console.log(`WebSocket connection closed: ${event.code} - ${event.reason}`);
};

socket.onerror = (error) => {
    console.error("WebSocket error:", error);
};

console.log("Attempting to connect to WebSocket...");
