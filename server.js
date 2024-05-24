const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { spawn } = require('child_process');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 7575;

app.get('/ai', (req,res)=>{
    return res.status(200).json({message:'AI server here'});
})

// #######################################################

app.post('/predict', (req, res) => {
    console.log('predict endpoint hit...');

    const { _revenueCategory, _year } = req.body;

    console.log(_revenueCategory, _year);

    if (typeof _revenueCategory === 'undefined' || typeof _year === 'undefined') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    const pyProcess = spawn('python', ['tax_model.py', _revenueCategory, _year.toString()]);

    pyProcess.stdout.on('data', (data) => {
        res.json({ prediction: data.toString().trim() });
    });

    pyProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });

    pyProcess.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
    });
});


app.listen(port, ()=> {
    console.log(`Server Started on Port: ${port}`);
})

