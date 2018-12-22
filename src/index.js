const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express();
const { mongoose } = require('./database')
//Configuracion 

app.set('port', process.env.PORT || 3000)

//MiddleWares
app.use(morgan('dev'))
app.use(express.json())

//Rutas
app.use('/api/tasks' ,require('./routes/task.routes'))


//Archivos Estaticos

app.use(express.static(path.join(__dirname, 'public')))

//Empezando el Servidor
app.listen(app.get('port'), () => { 
    console.log(`Servidor corriendo en el puerto: ${app.get('port')}`)
})