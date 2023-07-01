const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function getAllUsers(collection) {
    try {
      const users = await collection.find().toArray();
      return users;
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      throw error;
    }
  }

  async function createUser(collection, user) {
    try {
      const { password } = user;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const newUser = { ...user, password: hashedPassword };
  
      const result = await collection.insertOne(newUser);
      return result.insertedId;
    } catch (error) {
      console.error('Error al crear usuario:', error);
      throw error;
    }
  }
  
  async function deleteUser(collection, userId) {
    try {
      const result = await collection.deleteOne({ _id: userId });
      return result.deletedCount;
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw error;
    }
  }
  
  async function updateUser(collection, userId, updatedUser) {
    try {
      const result = await collection.updateOne({ _id: userId }, { $set: updatedUser });
      return result.modifiedCount;
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw error;
    }
  }
  
  async function getUserById(collection, userId) {
    try {
      const objectId = new ObjectId(userId); // Convertir el ID a ObjectId
      const user = await collection.findOne({ _id: objectId });
      return user;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }
  
  module.exports = {
    createUser,
    deleteUser,
    updateUser,
    getUserById,
    getAllUsers,
  };
  