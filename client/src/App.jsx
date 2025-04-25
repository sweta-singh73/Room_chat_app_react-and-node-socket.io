

// import React, { useEffect, useMemo, useState } from "react";
// import { io } from "socket.io-client";
// import { Box, Button, Container, Stack, TextField, Typography, Alert } from "@mui/material";

// const App = () => {
//   const socket = useMemo(() => io("http://localhost:4000"), []);

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [room, setRoom] = useState("");
//   const [socketId, setSocketId] = useState("");
//   const [roomName, setRoomName] = useState("");
//   const [error, setError] = useState("");
//   const [connected, setConnected] = useState(true);

//   console.log(messages);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!message.trim()) {
//       setError("Message cannot be empty");
//       return;
//     }
//     if (!room.trim()) {
//       setError("Room cannot be empty");
//       return;
//     }
//     setError("");
//     socket.emit("message", { message, room });
//     setMessage("");
//   };

//   const joinRoomHandler = (e) => {
//     e.preventDefault();
//     if (!roomName.trim()) {
//       setError("Room name cannot be empty");
//       return;
//     }
//     setError("");
//     socket.emit("join-room", roomName);
//     setRoomName("");
//   };

//   const handleDisconnect = () => {
//     socket.disconnect();
//     setConnected(false);
//   };

//   useEffect(() => {
//     socket.on("connect", () => {
//       setSocketId(socket.id);
//       console.log("connected", socket.id);
//       setConnected(true);
//     });

//     socket.on("receive-message", (data) => {
//       console.log(data);
//       setMessages((messages) => [...messages, data]);
//     });

//     socket.on("welcome", (s) => {
//       console.log(s);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return (
//     <Container maxWidth="sm">
//       <Box sx={{ height: 150 }} />
//       <Typography variant="h4" component="div" gutterBottom>
//         Welcome to Socket.io
//       </Typography>

//       <Typography variant="h6" component="div" gutterBottom>
//         {connected ? `Connected: ${socketId}` : "Disconnected"}
//       </Typography>

//       {error && <Alert severity="error">{error}</Alert>}

//       <form onSubmit={joinRoomHandler}>
//         <h2>Join Room</h2>
//         <TextField
//           value={roomName}
//           onChange={(e) => setRoomName(e.target.value)}
//           label="Room Name"
//           variant="outlined"
//         />
//         <Button type="submit" variant="contained" color="primary">
//           Join
//         </Button>
//       </form>

//       <form onSubmit={handleSubmit}>
//         <TextField
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           label="Message"
//           variant="outlined"
//         />

//         <TextField
//           value={room}
//           onChange={(e) => setRoom(e.target.value)}
//           label="Room"
//           variant="outlined"
//         />

//         <Button type="submit" variant="contained" color="primary">
//           Send
//         </Button>
//       </form>

//       <Stack>
//         {messages.map((m, i) => (
//           <Typography key={i} variant="h6" component="div" gutterBottom>
//             {m}
//           </Typography>
//         ))}
//       </Stack>

//       <Button onClick={handleDisconnect} variant="contained" color="secondary">
//         Live Chat (Disconnect)
//       </Button>
//     </Container>
//   );
// };

// export default App;


import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import "./App.css"; // Import custom CSS

const App = () => {
  const socket = useMemo(() => io("http://localhost:4000"), []);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const [connected, setConnected] = useState(true);

  console.log(messages);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError("Message cannot be empty");
      return;
    }
    if (!room.trim()) {
      setError("Room cannot be empty");
      return;
    }
    setError("");
    socket.emit("message", { message, room });
    setMessage("");
  };

  const joinRoomHandler = (e) => {
    e.preventDefault();
    if (!roomName.trim()) {
      setError("Room name cannot be empty");
      return;
    }
    setError("");
    socket.emit("join-room", roomName);
    setRoomName("");
  };

  const handleDisconnect = () => {
    socket.disconnect();
    setConnected(false);
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected", socket.id);
      setConnected(true);
    });

    socket.on("receive-message", (data) => {
      console.log(data);
      setMessages((messages) => [...messages, data]);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Container maxWidth="sm" className="chat-container">
      <Typography variant="h4" className="header">
        Welcome to Live Chat
      </Typography>

      <Typography variant="h6" className={connected ? "connected" : "disconnected"}>
        {connected ? `Connected: ${socketId}` : "Disconnected"}
      </Typography>

      {error && <Alert severity="error" className="alert">{error}</Alert>}

      <Paper elevation={3} className="chat-box">
        <form onSubmit={joinRoomHandler} className="form-group">
          <Typography variant="h6">Join a Room</Typography>
          <TextField
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            label="Room Name"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Join Room
          </Button>
        </form>

        <form onSubmit={handleSubmit} className="form-group">
          <TextField
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Message"
            variant="outlined"
            fullWidth
          />
          <TextField
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            label="Room"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </form>

        <Stack className="messages">
          {messages.map((m, i) => (
            <Typography key={i} variant="body1" className="message">
              {m}
            </Typography>
          ))}
        </Stack>
      </Paper>

      <Button onClick={handleDisconnect} variant="contained" color="secondary" className="disconnect-btn">
        Disconnect
      </Button>
    </Container>
  );
};

export default App;

