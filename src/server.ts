import express, { response } from 'express'

const app = express()

app.get("/users", (req, res) => {

  return res.json({ message: "Hello Word - NLW04" })
})

app.post("/", (req, res) => {

  return res.json({ message: "os dados foram salvos com sucesso" })
})
app.listen(3333, () => console.log("Server is running!"))