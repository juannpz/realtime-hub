const baseUrl = "ws://localhost:3002/ws/user";

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywicm9sZSI6IlVTRVIiLCJzZXNzaW9uSWQiOiJzb21lLXNlc3Npb24taWQifQ.some-signature";

const wsUrl = `${baseUrl}?auth_token=${authToken}`;

const socket = new WebSocket(wsUrl);

const MessageEventTypes = {
    NOTIFICATION: "NOTIFICATION",
    AUTHENTICATION_SUCCESS: "AUTHENTICATION_SUCCESS",
    PING: "PING",
    PONG: "PONG",
    GREET: "GREET"
};

socket.onopen = () => {
    console.log("WebSocket connection established.");

    socket.send(JSON.stringify({
        event: MessageEventTypes.GREET,
        data: { message: "Hello, server!" }
    }));
};

socket.onmessage = (event) => {
    try {
        const message = JSON.parse(event.data);

        if (message.event !== MessageEventTypes.PING) {
            console.log("Message from server:", message);
        }

        if (message.event === MessageEventTypes.PING) {
            socket.send(JSON.stringify({ event: MessageEventTypes.PONG }));
        }

    } catch (error) {
        console.error("Could not parse message from server:", event.data);
    }
};

socket.onclose = (event) => {
    if (event.wasClean) {
        console.log(`WebSocket connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
        console.error(`WebSocket connection died, code=${event.code}`);
    }
};

socket.onerror = (event) => {
    console.error("WebSocket error:", event.type);
};

console.log("Attempting to connect to WebSocket...");