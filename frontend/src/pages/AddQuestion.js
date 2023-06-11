import React, { Component } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label,Button} from '@windmill/react-ui'
import { MailIcon, TelephoneIcon } from '../icons'
//import response from '../utils/demo/tableData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';
const baseURL = "http://127.0.0.1:3001/preguntas"
//inicializamos las cookies 
const cookies = new Cookies();



class AddQuestion extends Component {

  state = {
    form:{
      nombre_pregunta:'',
      apellido_pregunta:'',
      email_pregunta:'',
      telefono_pregunta: '',
      pregunta:''
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

    ingresarPregunta = async() =>{
      await axios.post(baseURL,{
        nombre: this.state.form.nombre_pregunta,
        apellido: this.state.form.apellido_pregunta,
        email: this.state.form.email_pregunta,
        telefono: this.state.form.telefono_pregunta,
        pregunta: this.state.form.pregunta
      }).then(response=>{
        console.log(response.data);
        return response.data;
      }).catch(error =>{
        console.log(error);
      })
    }


  render(){
  return (
    <>
      <PageTitle>Añadir Pregunta</PageTitle>

      <div className="px-4 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800 mt-1">
        <Label className="mt-1">
          <span>Nombre</span>
          <Input className="mt-1" placeholder="Juan" name='nombre_pregunta' onChange={this.handleChange}/>
        </Label>

        <Label className="mt-4">
          <span>Apellido</span>
          <Input className="mt-1" placeholder="Perez" name='apellido_pregunta' onChange={this.handleChange}/>
        </Label>

        <Label className="mt-4">
          <span>Email</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="juan.perez@mail.com" name='email_pregunta' onChange={this.handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        <Label className="mt-4">
          <span>Teléfono</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <Input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="+56912345678" name='telefono_pregunta' onChange={this.handleChange}

            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <TelephoneIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
          <Label>Rol</Label>
          <div className="mt-2">
            <Label radio>
              <Input type="radio" value="administrador" name="accountType" />
              <span className="ml-2">Administrador</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="usuario" name="accountType" />
              <span className="ml-2">Usuario</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="nutricionista" name="accountType" />
              <span className="ml-2">Nutricionista</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="okylife" name="accountType" />
              <span className="ml-2">Okylife</span>
            </Label>
            <Label className="ml-6" radio>
              <Input type="radio" value="nutricoach" name="accountType" />
              <span className="ml-2">Nutricoach</span>
            </Label>
            
            <Label>
              <br></br>
              <span>Ingrese su pregunta</span>
              <Input className="mt-1" placeholder="Ej: ¿Cuánta proteína necesito comer al día?" name='pregunta' onChange={this.handleChange} />
            </Label>
          </div>
            
        </div>
        <br></br>
        <Button tag={Link} to="/app/Questions" onClick={() => this.ingresarPregunta()}>
                    Enviar pregunta
            </Button>
      </div>

      
    </>
  )
}
}
export default AddQuestion
