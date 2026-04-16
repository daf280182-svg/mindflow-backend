let historial = [];
const express = require("express");
const cors = require("cors");
const mongoose =
require("mongoose"); //
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://daf280182_db_user:gePHUc4keDCU7fKd@mindflow-cluster.ospmzdk.mongodb.net/?appName=mindflow-cluster")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));
const Historial =
mongoose.model("Historial", {
text: String,
result: String,
fecha: Date,
userId: String
});
app.post("/analyze", async (req, res) => {
  const { text, userId } = 
req.body;

  let result = "No entiendo bien cómo te sentís 🤔";

  if (!text) {
    result = "Escribí algo para poder ayudarte 🧠";
  } else {
    const texto = text.toLowerCase();

    if (texto.includes("triste") || texto.includes("depre") || texto.includes("llorar")) {
      result = "Siento que estés pasando por esto 💙. Las lágrimas también son una forma de limpiar. ¿Sentís que es una tristeza con nombre o algo más difuso?";
    } else if (texto.includes("feliz") || texto.includes("bien") || texto.includes("alegre") || texto.includes("genial")) {
      result = "¡Qué alegría! 😄 Guardemos este registro para cuando las cosas no brillen tanto. ¿Qué pequeño detalle hizo que hoy fuera un buen día?";
    } else if (texto.includes("estres") || texto.includes("agobiado") || texto.includes("presion")) {
      result = "Parece que el mundo está pesando mucho hoy 😟. Si pudieras ponerle pausa a todo por solo 10 minutos, ¿qué harías para cuidarte?";
    } else if (texto.includes("ansioso") || texto.includes("ansiedad") || texto.includes("panico") || texto.includes("acelerado")) {
      result = "La ansiedad es como un ruido blanco que no para 🌀. Vamos a bajar el volumen: buscá algo suave que tengas cerca y tocá su textura. ¿Cómo se siente?";
    } else if (texto.includes("enojado") || texto.includes("bronca") || texto.includes("furia")) {
      result = "El enojo tiene mucha energía 💢. ¿Sentís que esa energía necesita ser gritada, escrita o simplemente reconocida?";
    } else if (texto.includes("solo") || texto.includes("sola") || texto.includes("vacio")) {
      result = "La soledad a veces nos permite escucharnos sin interferencias 🤝, aunque duela. ¿Qué te dirías a vos mismo si fueras tu mejor amigo ahora?";
    } else if (texto.includes("familia") || texto.includes("papa") || texto.includes("mama") || texto.includes("hijo")) {
      result = "Los vínculos familiares son complejos y profundos 🌳. ¿Sentís que estás ocupando el lugar que querés en esa dinámica o te sentís forzado?";
    } else if (texto.includes("trabajo") || texto.includes("laburo") || texto.includes("jefe") || texto.includes("estudiar")) {
      result = "Pasamos mucho tiempo ahí como para que nos quite la paz 💼. ¿Es el cansancio por la tarea o por el clima con los demás?";
    } else if (texto.includes("cuerpo") || texto.includes("dolor") || texto.includes("enfermo") || texto.includes("panza")) {
      result = "El cuerpo a veces grita lo que la boca calla 🧘. Si ese malestar pudiera hablar, ¿qué creés que intentaría decirte?";
    } else if (texto.includes("sueño") || texto.includes("dormir") || texto.includes("insomnio")) {
      result = "El descanso es el combustible de la mente 🌙. ¿Tu cabeza sigue encendida repasando el pasado o preocupada por el mañana?";
    } else if (texto.includes("gracias") || texto.includes("chau") || texto.includes("hola")) {
      result = "¡De nada! Aquí estaré siempre que necesites descargar tu mente. Que tengas un momento de paz ✨.";
    } else if (texto.length < 5) {
      result = "Te noto breve hoy... 😶 A veces cuesta arrancar. ¿Querés intentar soltar solo una palabra de cómo te sentís?";
    } else {
      result = "Te escucho. Me quedé pensando en lo que dijiste... ✨ ¿Hay algo más que necesites sacar de adentro para aliviar la carga?";
    }
  }

  // 
  await Historial.create({
    text,
    result,
    fecha: new Date()
userId
  });

  res.json({ result });
});

// 📌 OBTENER HISTORIAL POR USUARIO
app.get("/historial", async (req, res) => {
  try {
    const { userId } = req.query;

    const data = await Historial.find({ userId }).sort({ fecha: -1 });

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error obteniendo historial" });
  }
});


// 📌 MODELO DE USUARIO
const Usuario = mongoose.model("Usuario", {
  email: String,
  password: String
});


// 📌 REGISTRO
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.create({ email, password });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error registrando usuario" });
  }
});


// 📌 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
