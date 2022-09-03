
const morgan = require('morgan')
const helmet = require('helmet')
const logger = require('../middlewares/logger');
//*routes
const courses = require('../routes/courses')
const express = require('express')
const app = express()

//* Middleware
app.use(express.json());

//cutome middlewares  -start
app.use(logger)

app.use(function(req,res,next){
    console.log('Autenticaing...');
    next() // use next if not ,everting stops here
})
//cutome middlewares  -end

// Built-in Middleware wit tis we can pass arrays ,comples objects
app.use(express.urlencoded({extended: true}))

//* builtin middleware used to server static files
app.use(express.static('public')) 

//* 3rd party middlewares
app.use(helmet())
app.use(morgan('tiny')) // evertym we make req morgan Logs req in console

//*Environments 
// if we set like NODE_ENV=production in terminal 
// and run nodemon indx.js it doesnt shows morgan in terminal on api req calls

// console.log('NODE_ENV: ${process.env.NODE_ENV}');
// console.log('app: ${app.get('env')}')

if(app.get('env') === 'development'){
    app.use(morgan('tiny'));
    console.log("Using morgan...")
}

//*ROutes using
//*witout use of localost:3000/api/courses we dont get any on browser
app.use('/api/courses',courses);

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))