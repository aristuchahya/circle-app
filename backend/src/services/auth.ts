import { PrismaClient } from "@prisma/client";
import { LoginDto, RegisterDto } from "../dto/auth-dto";
import { loginschema, registerschema } from "../validator/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
class AuthService {
  async register(dto: RegisterDto) {
    try {
      const validate = registerschema.validate(dto);

      if (validate.error) {
        return validate.error;
      }

      const salt = 10;

      const hashedPassword = await bcrypt.hash(dto.password, salt);
      dto.password = hashedPassword;
      if (validate.error) {
        return validate.error;
      }

      return await prisma.user.create({
        data: { ...dto },
      });
    } catch (error) {
      return error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const validate = loginschema.validate(dto);
      if (validate.error) {
        return validate.error;
      }

      const user = await prisma.user.findFirst({
        where: {
          OR: [
            {
              username: dto.usernameOrEmail,
            },
            {
              email: dto.usernameOrEmail,
            },
          ],
        },
      });

      if (!user) throw new Error("User Not Found");

      const isValidPassword = await bcrypt.compare(dto.password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      delete user.password;

      const jwtsecret = process.env.JWT_SECRET;
      const token = jwt.sign(user, jwtsecret);

      return { user, token };
    } catch (error) {
      return { error: error.message };
    }
  }
}

export const authService = new AuthService();
