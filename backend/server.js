const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de CORS mejorada
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como Postman, apps móviles, etc)
    if (!origin) return callback(null, true);
    
    // Lista de orígenes permitidos
    const allowedOrigins = [
      'http://localhost:4200',
      'http://localhost:3000',
      /https:\/\/.*\.vercel\.app$/  // Regex para cualquier subdominio de vercel.app
    ];
    
    // Verificar si el origin está permitido
    const isAllowed = allowedOrigins.some(allowed => {
      if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return allowed === origin;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('Origen bloqueado por CORS:', origin);
      callback(new Error('No permitido por CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB'))
.catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: String,
  name: String
});

const User = mongoose.model('User', userSchema);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando correctamente' });
});

// Ruta de Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('Intento de login:', { username });
    
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
    console.error('Error en login:', error);
    res.status(500).json({
      success: false,
      message: 'Error del servidor'
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
