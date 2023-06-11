import React, { Component } from 'react';
import PageTitle from '../components/Typography/PageTitle';
import { Input, Label, Button } from '@windmill/react-ui';
import { MailIcon, TelephoneIcon } from '../icons';
import axios from 'axios';
import { Link } from 'react-router-dom'
import id from 'faker/lib/locales/id_ID';
const baseURL = "http://127.0.0.1:3001/usuarios";

class DeletePatient extends Component {
  state = {
    form: {
      id: ''

    }
  }
  
  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id]: e.target.value
      }
    });
  }
  
  deletePatient = async()=>{
    
    await axios.delete(`http://127.0.0.1:3001/usuarios/${this.state.form.id}`,{
        id: this.state.form.id
        
    }).then(response=>{
      console.log(id)
      console.log(response.data);
      return response.data;
    })
    .then(response =>{
      if(response.length < 6){
        alert('faltan datos');
      }else{
        alert('Eliminado de forma correcta');
      }
    })
    .catch(error =>{
      console.log(error);
    })
  }
  
  render() {
    return (
      <>
        <PageTitle>Eliminar paciente</PageTitle>

        <div className="px-4 py-8 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <Label>
            <span>id</span>
            <Input className="mt-1" placeholder="Ingrese el id a eliminar" id='id' onChange={this.handleChange} />
          </Label>

         

        

          <div className="mt-4">
            <Button tag={Link} to='/app/patients' onClick={() => this.deletePatient()}>
              Eliminar Paciente
            </Button>
          </div>
        </div>
      </>
    );
  }
}

export default DeletePatient;
