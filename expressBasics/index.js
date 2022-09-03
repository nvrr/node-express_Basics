const express = require('express')
const app = express()

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
    res.send([1,2,3])
})

app.post('/app/courses', (req,res) => {
    const courses = {
        id: courses.length + 1,
        name: req.body.name
    }

    courses.push(course)
    res.send(course)
})


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening on ${port} port....`))