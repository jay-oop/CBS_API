

var fs = require('fs');

var data = fs.readFileSync('registry.json');

var registry = JSON.parse(data);

const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json())

app.listen(
    PORT,
    () => console.log(`Alive on http://localhost:${PORT}`)
)

app.get('/patient', (req, res) => {
    res.status(200).send(registry)
});

app.post('/patient/:PK', (req,res) => {

    const {PK} = req.params;
    const {DOB} = req.body;

    if(!DOB) {
        res.status(418).send({message: "Patient must have a date of birth!"})
    }

    res.send({
        patient: `Patient with PK ${PK} saved`
    });
});

app.put('/patient/:PK',(req, res) => {
    
    const {PK} = req.params;
    const {DOB} = req.body;

    res.send({
        patient: `Patient with PK ${PK} has been updated`
    })
});

app.delete('/patient/:PK',(req,res) => {
    const {PK} = req.params;

    res.send({
        patient: `Patient with PK ${PK} has been deleted`
    })
})