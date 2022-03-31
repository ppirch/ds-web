import { CssBaseline, Box, Container, AppBar, Toolbar, Typography, TextField, Grid, Button } from "@mui/material"
import { useState } from "react"

const ResponsiveAppBar = () => {
  return (
    <AppBar position="static" sx={{}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" noWrap component="div" sx={{ display: "flex" }}>
            LOGO
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

const DisplaySentiment = (props: { emoji: string; sentiment: string }) => {
  const { emoji, sentiment} = props
  return (
    <Box sx={{ justContent: 'center', textAlign: 'center' }}>
      <Typography sx={{ fontSize: '4rem' }}>{emoji}</Typography>
      <Typography sx={{ fontSize: '2rem' }}>{sentiment}</Typography>
    </Box>
  )
}

function App() {
  const [text, setText] = useState("")
  const [sentiment, setSentiment] = useState("")

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value)
  }

  const handleSubmit = async () => {
    if (text.length === 0) {
      return
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text })
    };
    const response = await fetch('https://nlp-api.ppirch.me/predict', requestOptions)
    const data = await response.json()
    setSentiment(data.sentiment)
  }

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh" }}>
        <ResponsiveAppBar />
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", p: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Text</Typography>
                <TextField multiline rows={4} fullWidth value={text} onChange={handleChange} required/>
                <Button variant="contained" fullWidth sx={{ my: 2 }} onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Result</Typography>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  {sentiment === 'q' && <DisplaySentiment emoji="🤔" sentiment="Question" />}
                  {sentiment === 'neg' && <DisplaySentiment emoji="🙁" sentiment="Negative" />}
                  {sentiment === 'neu' && <DisplaySentiment emoji="😐" sentiment="Neutral" />}
                  {sentiment === 'pos' && <DisplaySentiment emoji="😀" sentiment="Positive" />}
                </Box>
                
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default App
