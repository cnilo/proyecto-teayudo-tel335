import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import './assets/css/tailwind.output.css'
import App from './App'
import { SidebarProvider } from './context/SidebarContext'
import ThemedSuspense from './components/ThemedSuspense'
import { Windmill } from '@windmill/react-ui'
import * as serviceWorker from './serviceWorker'

// Requering to express module
//const express = require('express');
//const userRoutes = require('./routes/user.routes');
//const questionRoutes = require('./routes/questions.routes');
//require('./pages/db');



// Calling to express module
//const app = express();

// Generamos la constante de puerto para poder generar el servidor en el puerto que se requiera. Ya sea el 3000 por ahora o el puerto de entorno en el host que se almacene la página
//const PORT = (process.env.PORT || 5000);

//middlewares

//Nos sirve para pasar desde json a js y que el sistema lo pueda entender
//app.use(express.json());
//app.use('/api', userRoutes);
//app.use('/api', questionRoutes);


// routes

/*app.get('/' ,(req,res) =>{
    res.send('Bienvenidos a la API de OkyLife');

} ) 

// El sistema escucha el puerto 3000 y nos deja el mensaje si es que ocurre exitosamente
app.listen(PORT, () =>{
    console.log('Server escuchando en el puerto', PORT);
});

*/


/* -----------------------------------------------------*/ 
// if (process.env.NODE_ENV !== 'production') {
//   const axe = require('react-axe')
//   axe(React, ReactDOM, 1000)
// }

ReactDOM.render(
  <SidebarProvider>
    <Suspense fallback={<ThemedSuspense />}>
      <Windmill usePreferences>
        <App />
      </Windmill>
    </Suspense>
  </SidebarProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register()
