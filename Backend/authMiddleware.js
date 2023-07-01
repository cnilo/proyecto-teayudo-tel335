const jwt = require('jsonwebtoken');

// Función de middleware para autenticar el token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  jwt.verify(token, 'secreto', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token de autenticación inválido' });
    }
    req.user = user;
    next();
  });
}

module.exports = {
  authenticateToken
};
