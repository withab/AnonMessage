const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const { response } = require('express');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/add', (req, res) => {

    const message = req.body.message;

    const id = getId();

    fs.writeFileSync(`${__dirname}/messages/${id}`, message);

    res.send(id);

});

function getId() {

    let id;

    do {
        id = getIdStr();
    } while(fs.existsSync(__dirname + `/messages/${id}`));

    return id;

};

function getIdStr() {

    let id = String(Math.floor(Math.random() * 100000));
    id = '0'.repeat(5 - id.length) + id;

    return id;

};

app.get('/message/:id', (req, res) => {
  
    const data = String(fs.readFileSync(`${__dirname}/messages/${req.params.id}`));

    res.send(data);

});

app.listen(3000, () => console.log(`Listening on *:3000`));