import React, {Component} from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import Cookies from 'universal-cookie';
import md5 from 'md5';
import axios from 'axios'
//import { response } from 'express'
//import { response } from 'express'


const baseURL = "http://127.0.0.1:3001/usuarios"
//inicializamos las cookies 
const cookies = new Cookies();




class Login extends Component {

    state = {
      form:{
        nombre:'',
        apellido:'',
        rol:'',
        email:'',
        telefono:'',
        password:'',
        confirmPassword:'',
        description:''
      }
    }

    handleChange= async e =>{
      await this.setState({
        form:{
          ...this.state.form,
          [e.target.name]: e.target.value
        }
      });
      console.log(this.state.form);
    }

    crearCuenta = async()=>{
      await axios.post(baseURL,{
          nombre: this.state.form.nombre,
          apellido: this.state.form.apellido,
          rol: (this.state.form.rol).toLowerCase(),
          email: this.state.form.email,
          telefono: this.state.form.telefono,
          password: md5(this.state.form.password),
          confirmPassword: md5(this.state.form.confirmPassword),
          description: this.state.form.description
        
      }).then(response=>{
        console.log(response.data);
        return response.data;
      })
      .then(response =>{
        if(response.length < 6){
          alert('faltan datos');
        }else{
          alert('Registrado de forma correcta');
        }
      })
      .catch(error =>{
        console.log(error);
      })
    }



  render(){
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
                Crear cuenta
              </h1>
              <Label>
                <span>Nombre</span>
                <Input className="mt-1" type="text" placeholder="Romina" name='nombre' required onChange={this.handleChange}/>
              </Label>
              <Label className="mt-4">
                <span>Apellido</span>
                <Input className="mt-1" type="text" placeholder="Kustermann" name='apellido' required onChange={this.handleChange} />
              </Label>
              <Label className="mt-4">
                <span>Rol</span>
                <Input className="mt-1" type="text" placeholder="Paciente, AFI, nutricoach, etc." name='rol' required onChange={this.handleChange} />
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" name='email' required onChange={this.handleChange}/>
              </Label>
              <Label className="mt-4">
                <span>Teléfono</span>
                <Input className="mt-1" type="text" placeholder="+56912345678" name='telefono' required onChange={this.handleChange}/>
              </Label>
              <Label className="mt-4">
                <span>Contraseña</span>
                <Input className="mt-1" placeholder="***************" type="password" name='password' required  onChange={this.handleChange}/>
              </Label>
              <Label className="mt-4">
                <span>Confirmar contraseña</span>
                <Input required='required' className="mt-1" placeholder="***************" type="password" name='confirmPassword'  onChange={this.handleChange}/>
              </Label>
              <Label className="mt-4">
                <span>Descripción</span>
                <Input className="mt-1" placeholder="Ingresa una breve descripción de ti para que los demás te conozcan :) " type="text" name='description' onChange={this.handleChange}/>
              </Label>


              <Label className="mt-6" check>
                <Input type="checkbox" />
                <span className="ml-2">
                  Estoy de acuerdo con las <span className="underline">políticas de privacidad</span>
                </span>
              </Label>

              <Button tag={Link} to="/login" block className="mt-4" onClick={() => this.crearCuenta()}>
                Crear cuenta
              </Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Ya tienes cuenta? Ingresa acá
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
}

export default Login
