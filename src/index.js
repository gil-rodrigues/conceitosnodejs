const express=require('express');

const app=express();
app.use(express.json());
const { uuid }=require('uuidv4');


const projects = [];

function log(req,res,next){
    const { method, url } = req;

    console.log(`[${method.toUpperCase()}] ${url}`)

    return next();
}

app.use(log);

app.get('/projects',(req,res) => {
    // const { title, owner } = req.query;

    // console.log(title);
    // console.log(owner);

    return res.json(projects);
})

app.post('/projects',(req,res) => {
    const { title, owner } = req.body;

    const project = { id:uuid(), title, owner }
    projects.push(project);

    

    return res.json(project);
})

app.put('/projects/:id',(req,res) => {
    const { id } = req.params;
    const { title, owner } = req.body;

    const projectIndex = projects.findIndex(project => project.id == id)
    
    console.log(projects)

    if(projectIndex < 0)
        return res.status(400).json({ error: "Project not found"})


    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return res.json(project);
})


app.delete('/projects/:id',(req,res) => {
    const { id } = req.params;
    const projectIndex = projects.findIndex(project => project.id == id)
    
    if(projectIndex < 0)
        return res.status(400).json({ error: "Project not found"})

    projects.splice(projectIndex, 1);

    return res.json(projectIndex + " deleted.");
})


app.listen(3333,()=>console.log("App Started"));