import { userRouters } from '../app/modules/user/user.router';
import { academicSemesterRouters } from '../app/modules/academicSemester/academicSemester.router';
import { academicFacultyRouters } from '../app/modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../app/modules/academicDepartment/academicDepartment.router';
import { studentRouters } from '../app/modules/student/student.router';
import { facultyRouters } from '../app/modules/faculty/faculty.router';

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
  {
    path: '/academic-department',
    route: academicDepartmentRouter.router,
  },
  {
    path: '/students',
    route: studentRouters.router,
  },
  {
    path: '/faculty',
    route: facultyRouters.router,
  },
];

export default modulesRoutes;
