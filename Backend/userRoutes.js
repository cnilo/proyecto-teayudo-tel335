const express = require('express');
const userController = require('./userController');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { connectToUsersCollection } = require('./db');


const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const collection = req.app.locals.collection;
    const users = await userController.getAllUsers(collection);
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

  
  

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;
    const user = await userController.getUserById(collection, userId);
    res.json(user);
    console.log(user);
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).json({ error: 'Error al obtener usuario por ID' });
  }
});

router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    const collection = await connectToUsersCollection(); // Obtener la colección correctamente
    await userController.createUser(collection, newUser);
    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

router.delete('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const collection = req.app.locals.collection;
    await userController.deleteUser(collection, userId);
    res.json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
});

router.put('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const updatedUser = req.body;
    const collection = req.app.locals.collection;
    await userController.updateUser(collection, userId, updatedUser);
    res.json({ message: 'Usuario actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const collection = await connectToUsersCollection();

    // Obtener el usuario por correo electrónico
    const user = await collection.findOne({ email });

    // Verificar si el usuario existe y comparar la contraseña proporcionada
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, 'secreto_del_token');

    // Si las credenciales son válidas, generar un token de autenticación (puedes usar JWT)

    // Enviar el token de autenticación y el userId como respuesta
    res.json({ token, userId: user._id });
  } catch (error) {
    console.error('Error al realizar el inicio de sesión:', error);
    res.status(500).json({ error: 'Error al realizar el inicio de sesión' });
  }
});

module.exports = router;