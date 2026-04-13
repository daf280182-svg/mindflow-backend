const express = require("express");
const cors = require("cors");
app.use(cors());

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  console.log("REQUEST RECIBIDO:", text);

  res.json({
    result: "OK backend funcionando"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
