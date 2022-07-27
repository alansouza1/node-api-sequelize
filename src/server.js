require('dotenv').config();
const app = require('./api');
const validateJWT = require('./auth/validateJWT');
const loginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

app.get('/user', validateJWT, UserController.findAll);

app.post('/login', loginController);
app.post('/user', UserController.create);

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
