import { userRouters } from '../app/modules/user/user.router';
import { academicSemesterRouters } from '../app/modules/academicSemester/academicSemester.router';
import { academicFacultyRouters } from '../app/modules/academicFaculty/academicFaculty.router';

const modulesRoutes = [
  {
    path: '/users',
    route: userRouters.router,
  },
  {
    path: '/academic-semester',
    route: academicSemesterRouters.router,
  },
  {
    path: '/academic-faculty',
    route: academicFacultyRouters.router,
  },
];

export default modulesRoutes;
