import React , {Component} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import Cookies from 'universal-cookie';
import md5 from "md5";



//const baseURL = "../../backend/API/db.json";
const baseURL = "http://127.0.0.1:3001/usuarios"
//const baseURL = "https://api.okycoach.cl/db_users.json"


const cookies = new Cookies();
class Login extends Component {

  state={
    form:{
      email:'',
      password:''
    }
  }

  handleChange=async e=>{
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    });
    console.log(this.state.form);
  }

  iniciarSesion=async()=>{
    await axios.get(baseURL,{params: {email: this.state.form.email, password: md5(this.state.form.password)}})
    .then(response=>{
      return response.data;
    })
    .then(response=>{
      if(response.length > 0){
        var respuesta = response[0];
        cookies.set('id',respuesta.id, {path: "/"});
        cookies.set('nombre',respuesta.nombre, {path: "/"});
        cookies.set('apellido',respuesta.apellido, {path: "/"});
        cookies.set('email',respuesta.email, {path: "/"});
        cookies.set('description', respuesta.description, {path: '/'});
        cookies.set('rol',respuesta.rol,{path: "/"});
        window.location.href='/app/questions';
        alert("Bienvenido a okycoach " + respuesta.nombre + " :)" );
        
      }
      else{
        alert('El usuario o la contraseña no son correctos');
        //window.location.href='/';
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  
    /*componentDidMount(){
      if(cookies.get('email')){
        window.location.href='app/questions';
      }
    }*/

  render() {
  return (
    <>
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
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Iniciar sesión</h1>
              <Label>
                <span>Email</span>
                <Input className="mt-1" type="email" placeholder="john@doe.com" name='email' onChange={this.handleChange}/>
              </Label>

              <Label className="mt-4">
                <span>Contraseña</span>
                <Input className="mt-1" type="password" placeholder="***************" name='password' onChange={this.handleChange}/>
              </Label>

              <Button className="mt-4" block tag={Link}  onClick={() => this.iniciarSesion()}>
                Ingresar
              </Button>

              <hr className="my-8" />
              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button className="mt-4" block layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>
      
             
             
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
  
  }
}


export default Login
