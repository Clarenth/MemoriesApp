import express from 'express';

import { signin, signup } from '../controllers/controllersUser.js'; 

const routerUser = express.Router();

routerUser.post('/signin', signin);
routerUser.post('/signup', signup);

export default routerUser;