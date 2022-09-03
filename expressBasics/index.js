
const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json());

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
   
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const validity = schema.validate(req.body);
    if(validity.error){
        res.status(400).send(validity.error.details[0].message);
        return;
    }

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

    
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    const validity = schema.validate(req.body);
    if(validity.error){
        res.status(400).send(validity.error.details[0].message);
        return;
    }

    course.name = req.body.name;
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))