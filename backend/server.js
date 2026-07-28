const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'ejemplo_db'
};

// Conexión a la base de datos
let connection;

async function conectarDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos MySQL');
    
    // Manejar desconexión
    connection.on('error', async (err) => {
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        console.log('Reconectando a la base de datos...');
        await conectarDB();
      }
    });
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    // Reintentar después de 5 segundos
    setTimeout(conectarDB, 5000);
  }
}
conectarDB();

app.get('/', (req, res) => {
  res.json({ message: 'API funcionando' });
});

// Endpoint para obtener usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});