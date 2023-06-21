import { userRouters } from '../app/modules/user/user.router';
import { academicSemesterRouters } from '../app/modules/academicSemester/academicSemester.router';
import { academicFacultyRouters } from '../app/modules/academicFaculty/academicFaculty.router';
import { academicDepartmentRouter } from '../app/modules/academicDepartment/academicDepartment.router';
import { studentRouters } from '../app/modules/student/student.router';
import { managementDepartmentRouters } from '../app/modules/managementDepartment/managementDepartment.router';
import { facultyRouters } from '../app/modules/faculty/faculty.router';
import { adminRouters } from '../app/modules/admin/admin.router';
import { authRouters } from '../app/modules/auth/auth.router';

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
    path: '/management-department',
    route: managementDepartmentRouters.router,
  },
  {
    path: '/students',
    route: studentRouters.router,
  },
  {
    path: '/faculty',
    route: facultyRouters.router,
  },
  {
    path: '/admin',
    route: adminRouters.router,
  },
  {
    path: '/auth',
    route: authRouters.router,
  },
];

export default modulesRoutes;
