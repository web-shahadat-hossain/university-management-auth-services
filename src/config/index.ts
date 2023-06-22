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
  default_bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt: {
    secret_token: process.env.JWT_SECRET_TOKEN,
    secret_expire_in: process.env.JWT_SECRET_EXPIRES_IN,
    refresh_token: process.env.JWT_REFRESH_TOKEN,
    refresh_expire_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
