import React, { Component } from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button} from '@windmill/react-ui'
import { MailIcon, TelephoneIcon } from '../icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie'
import md5 from 'md5'
const baseURL = "http://127.0.0.1:3001/usuarios"
const cookies = new Cookies();


class AddPatient extends Component {

  state = {
    form:{
      nombre:'',
      apellido:'',
      email:'',
      telefono:'',
      rol:'paciente'
      
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

  addPatient = async()=>{
    await axios.post(baseURL,{
        nombre: this.state.form.nombre,
        apellido: this.state.form.apellido,
        email: this.state.form.email,
        telefono: this.state.form.telefono,
        rol: this.state.form.rol
        
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
    <>
      <PageTitle>Añadir Paciente</PageTitle>

      

      <div className="px-4 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Nombre</span>
          <Input className="mt-1" placeholder="Juan" name='nombre' onChange={this.handleChange}/>
        </Label>

        <Label className='mt-4'>
          <span>Apellido</span>
          <Input className="mt-1" placeholder="Perez" name='apellido' onChange={this.handleChange}/>
        </Label>

        <Label className='mt-4'>
          <span>Email</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="juan.perez@mail.com" name='email' onChange={this.handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label >
        <Label className='mt-4'> 
          <span>Teléfono</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="+56912345678
" name='telefono' onChange={this.handleChange}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <TelephoneIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
        </Label>

        

        
       <div className="mt-4">
          {/* TODO: Check if this label is accessible, or fallback */}
          {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}

        
          <div className="my-5">
            <Button tag={Link} to="/app/Patients" onClick={() => this.addPatient()}>
                    Agregar Paciente
            </Button>
           </div>
        </div>
      </div>

      
    </>
  )
}
}
export default AddPatient
