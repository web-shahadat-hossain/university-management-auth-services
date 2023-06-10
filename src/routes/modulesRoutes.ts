import { userRouters } from '../app/modules/user/user.router';
import { academicSemesterRouters } from '../app/modules/academicSemester/academicSemester.router';

const modulesRoutes = [
  {
    path: '/users',
    route: userRouters.router,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouters.router,
  },
];

export default modulesRoutes;
