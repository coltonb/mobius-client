import { Box, Grid, Typography, Paper, Container } from "@material-ui/core";
import Chat from "components/Chat.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container direction="column" style={{ minHeight: "100vh" }}>
        <Grid item>
          <Box height="50px" overflow="hidden">
            <Paper
              style={{
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
              square
            >
              <Box pl={1}>
                <Typography variant="h4">MOBIUS</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
        <Grid container style={{ flex: 1, padding: 25 }}>
          <Chat />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
