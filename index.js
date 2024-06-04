const express = require('express');
const routerApi = require('./routes');
const app = express();
const { faker } = require('@faker-js/faker');
const port = 3000;
const { logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
    console.log('Server running on port ' + port);
})

