import express from 'express';
import modulesRoutes from './modulesRoutes';
const routes = express.Router();

modulesRoutes.forEach(route => routes.use(route.path, route.route));

export default routes;
