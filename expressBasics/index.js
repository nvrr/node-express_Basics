
const morgan = require('morgan')
const helmet = require('helmet ')
const Joi = require('joi')
const logger = require('./logger');
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


const courses = [{ id: 1, name: 'Mathematics' }, { id: 2, name: 'English' }, 
{ id: 3, name: 'Yoruba' }];

app.get('/', (req,res)=>{
    res.send('Hello expressjs')
})

app.get('/api/courses/:id', (req,res)=>{
    // res.send(req.params.id);
    var course = courses.find(c => {
        return c.id === parseInt(req.params.id)
    });

    if(!course) res.status(404).send('Course doent exist..')

    res.send(course)
})

app.get('/api/courses', (req,res)=>{
    res.send(courses)
})

app.post('/api/courses', (req, res) => {
   
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });

    // const validity = schema.validate(req.body);
    // if(validity.error){
    //     res.status(400).send(validity.error.details[0].message);
    //     return;
    // }

    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
 
    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => {    
    var course = courses.find(c => {return c.id === parseInt(req.params.id)});
    if (!course)  {
        res.status(404).send('The course with the given ID was not found')
        return;
    };

    
    // const schema = Joi.object({
    //     name: Joi.string().min(3).required()
    // });

    // const validity = schema.validate(req.body);
    // if(validity.error){
    //     res.status(400).send(validity.error.details[0].message);
    //     return;
    // }

    const {error} = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    course.name = req.body.name;
    res.send(course);
});


app.delete('/api/courses/:id', (req, res) => {
    var course = courses.find(c => {return c.id === parseInt(req.params.id)});

    if (!course) return res.status(404).send('The course with the given ID was not found');
const index = courses.indexOf(course)
courses.splice(index,1)
res.send(course)
});


function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course)
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))