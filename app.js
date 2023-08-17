import express from 'express';
import 'dotenv/config';
import axios from 'axios';
import cors from "cors";
import { createClient } from 'pexels';

const DATA_ENDPOINT = process.env.ENDPOINT_URL
const PORT = process.env.SERVER_PORT || 3000
const PEXELS_KEY = process.env.PEXELS_KEY


const pexelsClient = createClient(PEXELS_KEY);


const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.send("It's alive!")
})

app.get("/data", async (req, res) => {
  const {data} = await axios.get(DATA_ENDPOINT)
  res.json(data)
})


app.post("/photos", async (req, res) => {
  const {query, perPage} = req.body
  if (!query) {
    res.status(400).send("query required!");
    return
  }

  const response = await pexelsClient.photos.search({
    query,
    per_page: perPage || 10
  })

  res.json(response)
})

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
})

