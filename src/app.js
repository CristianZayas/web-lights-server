/* Este paquete lo que lo sirve para 
   crear un servidor de nodejs facilmente.
 */
const express = require('express');
/*
Morgan los sirve para ver lo que entre y sale cuando 
Mandamos una peticion al servidor
 */
const morgan = require('morgan');
/*  Este es un paquete de platillas de javascript */
const engine = require('ejs-mate');
/* Este paquete lo que hace los ayuda a facilitanos en la rutas del nuestro sistema
   operativo ya sea de windows o de mac o linux este paque le las rutas dinamica mente donde
   este los archivos que estemos utilizamos
 */
const path = require('path');
/* En este apartado lo que hacemos es inicializar el express que es nuestro 
   servidor que los vamos a pasar una cosntante llama app
   */
const app = express();
/* Vamos a inportar el http para crear un servidor mas paera  */
const http = require('http');
const serve = http.createServer(app);
const cors = require('cors');

app.use(cors({origin: 'http://localhost:3000/'}));
app.set('port' , process.env.PORT || 3001);
app.engine('ejs' , engine);
app.set('views' , path.join(__dirname , 'views'));
app.set('view engine' , 'ejs');
console.log(path.join(__dirname , 'views'))
app.use(morgan("dev"));

/* This router path */
app.get('/' , (req , res) => {
    res.status(200).render('index')
});

app.get('/chat' , (req , res) => {
    res.status(200).render('chat')
})

module.exports = {app , serve};