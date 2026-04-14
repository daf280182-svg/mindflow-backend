const express = 
require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});
app.post("/analyze", (req, res) => {
  const { text } = req.body;
 let result = "No entiendo bien cómo te sentís 🤔";

  if (!text) {
    result = "Escribí algo para poder ayudarte 🧠";
  } else if (text.toLowerCase().includes("triste")) {
    result = "Siento que estés triste 💙, todo pasa, no estás solo";
  } else if (text.toLowerCase().includes("feliz")) {
    result = "¡Qué bueno que estés feliz! 😄 Disfrutá ese momento";
  } else if (text.toLowerCase().includes("estres")) {
    result = "Parece que estás estresado 😣, probá respirar profundo";
  } else if (text.toLowerCase().includes("cansado")) {
    result = "Tal vez necesitás descansar 😴";
  } else if (text.toLowerCase().includes("ansioso")) {
    result = "Respirá lento, todo va a estar bien 🧘";
  }

  console.log("REQUEST RECIBIDO:", text);

  res.json({
    result: "OK backend funcionando"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
