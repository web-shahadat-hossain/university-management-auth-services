import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  Default_Student_Pass: process.env.DEFAULT_STUDENT_PASS,
  Default_Faculty_Pass: process.env.DEFAULT_FACULTY_PASS,
  Default_Admin_Pass: process.env.DEFAULT_ADMIN_PASS,
};
