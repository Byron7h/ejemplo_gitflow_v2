const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mi_secreto_super_seguro';

function generarToken(usuario) {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    SECRET_KEY,
    { expiresIn: '24h' }
  );
}

function verificarToken(token) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}

module.exports = { generarToken, verificarToken };
