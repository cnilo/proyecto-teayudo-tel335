import React, {Component} from 'react'
import PageTitle from '../components/Typography/PageTitle'
import { Input, Label, Button} from '@windmill/react-ui'
import { MailIcon, TelephoneIcon } from '../icons'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'universal-cookie';
const baseURL = "http://127.0.0.1:3001/respuestas"


class AnswerQuestion extends Component {

    state = {
        form:{
          paciente:'',
          nutricionista_a_cargo:'',
          email_paciente:'',
          respuesta:''
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

      ingresarRespuesta = async() =>{
        await axios.post(baseURL,{
            paciente: this.state.form.paciente,
            nutricionista_a_cargo: this.state.form.nutricionista_a_cargo,
            email_paciente: this.state.form.email_paciente,
            respuesta: this.state.form.respuesta
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
        <PageTitle>Añadir Respuesta</PageTitle>

        <div>
        <Label>
              <br></br>
              <span>Nombre Paciente</span>
              <Input className="mt-1" placeholder="Ingrese el nombre del paciente" name='paciente' onChange={this.handleChange}/>
            </Label>
        <Label>
              <br></br>
              <span>Nombre nutricionista</span>
              <Input className="mt-1" placeholder="Ingrese el nombre del nutricionista" name='nutricionista_a_cargo' onChange={this.handleChange}/>
            </Label>
        <Label>
        <Label>
              <br></br>
              <span>Email del paciente</span>
              <Input className="mt-1" placeholder="Ingrese el email del paciente" name='email_paciente' onChange={this.handleChange}/>
            </Label>
              <br></br>
              <span>Ingrese su respuesta</span>
              <Input className="mt-1" placeholder="Ej: ¿Cuánta proteína necesito comer al día?" name='respuesta' onChange={this.handleChange}/>
            </Label>
       

        <br></br>
        <Button tag={Link} to="/app/Profiles" onClick={() => this.ingresarRespuesta()}>
                    Enviar respuesta
            </Button>
            </div>
        </>
    )
}
}
export default AnswerQuestion