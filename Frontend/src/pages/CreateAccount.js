import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import ImageLight from '../assets/img/create-account-office.jpeg';
import ImageDark from '../assets/img/create-account-office-dark.jpeg';
import { Input, Label, Button, Select } from '@windmill/react-ui';

function Login() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rol, setRol] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleCreateAccount = () => {
    // Verifica que todos los campos estén llenos
    if (!nombre || !email || !password || !confirmPassword || !rol) {
      alert('Por favor, completa todos los campos');
      return;
    }
  
    // Verifica que las contraseñas coincidan
    if (password !== confirmPassword) {
      
      alert('Las contraseñas no coinciden');
      return;
    }
  
    // Crea un objeto con la información del usuario
    const userData = {
      nombre,
      email,
      password,
      rol,
    };
  
    // Realiza la solicitud POST para crear un usuario
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users`, userData)
      .then(response => {
        alert('Usuario creado exitosamente');
        setRedirect(true); // Establece el estado de redirección a true
        // Realiza cualquier otra acción necesaria después de crear el usuario
      })
      .catch(error => {
        console.error('Error al crear usuario:', error);
        // Maneja el error de creación de usuario
      });
  };
  
  if (redirect) {
    return <Redirect to="/login" />; // Redirige al usuario al formulario de inicio de sesión
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Crea tu cuenta
              </h1>
              <Label>
                <span>Nombre</span>
                <Input
                  className="mt-1"
                  type="nombre"
                  placeholder="Juanito Perez"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Input
                  className="mt-4"
                  type="email"
                  placeholder="john@doe.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span>Contraseña</span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span>Confirma tu contraseña</span>
                <Input
                  className="mt-1"
                  placeholder="***************"
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                />
              </Label>
              <Label className="mt-4">
                <span>Rol</span>
                <Select
                  className="mt-1"
                  type="role"
                  value={rol}
                  onChange={e => setRol(e.target.value)}
                >
                  <option>Doctor</option>
                  <option>Paciente</option>
                </Select>
              </Label>

              <Button onClick={handleCreateAccount} block className="mt-4">
                Crear cuenta
              </Button>
              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  ¿Ya tienes una cuenta? Inicia sesión
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
