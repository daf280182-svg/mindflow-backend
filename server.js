const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend funcionando 🚀");
});
app.post("/analyze", (req, res) => {
  const { text } = req.body;

  let result = "";

  if (!text || text.trim() === "") {
    result = "Contame cómo te sentís 😊";
  } else if (text.toLowerCase().includes("triste")) {
    result = "Parece que estás triste 😔. Estoy acá para escucharte. ¿Qué pasó?";
  } else if (text.toLowerCase().includes("ansioso")) {
    result = "La ansiedad puede ser difícil 😣. Probá respirar profundo unos segundos.";
  } else if (text.toLowerCase().includes("feliz")) {
    result = "¡Qué bueno que te sentís feliz! 😄 Disfrutá ese momento.";
  } else if (text.toLowerCase().includes("estres")) {
    result = "El estrés puede acumularse 😓. Quizás te ayudaría tomar un descanso.";
  } else {
    result = "Gracias por compartir eso 💙. ¿Querés contarme un poco más?";
  }

  res.json({ result });
});

app.listen(5000, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto 5000");
});
