const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "mi_clave_secreta";

// 🔐 Middleware
const verificarToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "No autorizado" });
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};

// 🔗 Mongo
mongoose.connect("mongodb+srv://daf280182_db_user:gePHUc4keDCU7fKd@mindflow-cluster.ospmzdk.mongodb.net/?appName=mindflow-cluster")
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log(err));

// 📦 Modelos
const Historial = mongoose.model("Historial", {
  text: String,
  result: String,
  fecha: Date,
  userId: String
});

const Usuario = mongoose.model("Usuario", {
  email: String,
  password: String
});

// 🧠 ANALYZE
app.post("/analyze", verificarToken, async (req, res) => {
  const { text } = req.body;

  let result = "No entiendo bien cómo te sentís 🤔";

  if (!text) {
    result = "Escribí algo para poder ayudarte 🧠";
  } else {
    const texto = text.toLowerCase();

    if (texto.includes("triste") || texto.includes("depre") || texto.includes("llorar")) {
      result = "Siento que estés pasando por esto 💙. ¿Sentís que es una tristeza con nombre o algo más difuso?";
    } else if (texto.includes("feliz") || texto.includes("bien") || texto.includes("alegre")) {
      result = "¡Qué alegría! 😄 ¿Qué hizo que hoy fuera un buen día?";
    } else if (texto.includes("estres") || texto.includes("agobiado")) {
      result = "Parece que el mundo pesa mucho hoy 😟. ¿Qué te ayudaría a soltar un poco?";
    } else {
      result = "Te escucho ✨ ¿Querés contarme más?";
    }
  }

  await Historial.create({
    text,
    result,
    fecha: new Date(),
    userId: req.userId
  });

  res.json({ result });
});

// 📜 HISTORIAL
app.get("/historial", verificarToken, async (req, res) => {
  try {
    const data = await Historial.find({ userId: req.userId }).sort({ fecha: -1 });
    res.json(data);
  } catch {
    res.status(500).json({ error: "Error obteniendo historial" });
  }
});

// 🔐 REGISTER
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existe = await Usuario.findOne({ email });

    if (existe) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await Usuario.create({
      email,
      password: passwordHash
    });

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token, user });
  } catch {
    res.status(500).json({ error: "Error registrando usuario" });
  }
});

// 🔐 LOGIN
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const passwordCorrecta = await bcrypt.compare(password, user.password);

    if (!passwordCorrecta) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ id: user._id }, SECRET);

    res.json({ token, user });
  } catch {
    res.status(500).json({ error: "Error en login" });
  }
});

// 🚀 SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});
