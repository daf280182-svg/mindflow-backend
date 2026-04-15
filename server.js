let historial = [];
const express = 
require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.post("/analyze", (req, res) => {
  const { text } = req.body;

  let result = "No entiendo bien cómo te sentís 🤔";

  if (!text) {
    result = "Escribí algo para poder ayudarte 🧠";
  } else {
    const texto = text.toLowerCase();

    if (texto.includes("triste")) {
      result = "Siento que estés triste 💙";
    } else if (texto.includes("feliz")) {
      result = "¡Qué bueno que estés feliz! 😄";
    } else if (texto.includes("estres")) {
      result = "Parece que estás estresado 😣";
    }
  }

  // 
  historial.push({
    text,
    result,
    fecha: new Date()
  });

  res.json({ result });
});

app.get("/historial", (req, res) => {
  res.json(historial);
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor 
corriendo en puerto " + PORT);
});
