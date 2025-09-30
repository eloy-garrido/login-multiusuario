const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:4200',           // desarrollo local
    'https://*.vercel.app',            // cualquier subdominio de vercel
    'https://vercel.app'               // vercel.app
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  name: String
});

const User = mongoose.model('User', userSchema);

// Ruta de Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await User.findOne({ username, password });
    
    if (user) {
      res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          role: user.role,
          name: user.name
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Credenciales inválidas'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});