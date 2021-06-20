import { useState, useEffect, useRef } from "react";
import {
  List,
  ListItem,
  ListItemText,
  OutlinedInput,
  FormControl,
  Grid,
  Box,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Config from "Config";

const ws = new WebSocket(Config.WS_HOST);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flex: "1",
  },
  messages: {
    flex: "1 1 0",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.4em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.2)",
    },
  },
}));

function Chat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  });

  ws.onmessage = (message) => {
    setMessages([...messages, message]);
  };

  async function onKeyDown(event) {
    const message = event.target.value;
    if (event.key === "Enter" && message.length > 0) {
      await ws.send(message);
      event.target.value = "";
    }
  }

  return (
    <Grid className={classes.root} container direction="column">
      <Grid item className={classes.messages}>
        <List>
          {messages.slice(-25).map((message) => (
            <ListItem>
              <Paper>
                <Box p={1}>
                  <ListItemText>{message.data}</ListItemText>
                </Box>
              </Paper>
            </ListItem>
          ))}
        </List>
        <div ref={messagesEndRef}></div>
      </Grid>
      <Grid item>
        <Box p={1}>
          <FormControl fullWidth>
            <OutlinedInput onKeyDown={onKeyDown} id="message" />
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Chat;
