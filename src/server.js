require('dotenv').config();

const app = require('./api');

const validateJWT = require('./auth/validateJWT');

const loginController = require('./controllers/loginController');
const UserController = require('./controllers/userController');
const CategoryController = require('./controllers/categoryController');
const PostController = require('./controllers/postController');

const port = process.env.API_PORT || 3000;

app.get('/user', validateJWT, UserController.findAll);
app.get('/user/:id', validateJWT, UserController.findById);
app.get('/categories', validateJWT, CategoryController.findAll);
app.get('/post', validateJWT, PostController.findAll);

app.post('/login', loginController);
app.post('/user', UserController.create);
app.post('/categories', validateJWT, CategoryController.create);

app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log('ouvindo porta', port));
