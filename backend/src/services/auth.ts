import { PrismaClient, VerificationType } from "@prisma/client";
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
        throw new Error(validate.error.message);
      }

      const salt = 10;

      const hashedPassword = await bcrypt.hash(dto.password, salt);
      dto.password = hashedPassword;

      return await prisma.user.create({
        data: { ...dto },
      });
    } catch (error) {
      throw new Error(error.message || "Failed to register");
    }
  }

  async login(dto: LoginDto) {
    try {
      const validate = loginschema.validate(dto);
      if (validate.error) {
        throw new Error(validate.error.message);
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

      if (!user.isVerified) throw new Error("user is not verified");

      if (!user) throw new Error("User Not Found");

      const isValidPassword = await bcrypt.compare(dto.password, user.password);
      if (!isValidPassword) throw new Error("Invalid Password");

      delete user.password;

      const jwtsecret = process.env.JWT_SECRET;
      const token = jwt.sign(user, jwtsecret);

      return { user, token };
    } catch (error) {
      throw new Error(error.message || "Failed to login");
    }
  }

  async createVerification(token: string, type: VerificationType) {
    try {
      return await prisma.verification.create({
        data: {
          token,
          type,
        },
      });
    } catch (error) {
      throw new Error(error.message || "Failed to verify");
    }
  }

  async verify(token: string) {
    try {
      const verification = await prisma.verification.findUnique({
        where: { token },
      });

      const userId = jwt.verify(verification.token, process.env.JWT_SECRET);

      if (verification.type === "FORGOT_PASSWORD") return;

      return await prisma.user.update({
        data: {
          isVerified: true,
        },
        where: {
          id: Number(userId),
        },
      });
    } catch (error) {
      throw new Error(error.message || "Failed to verify email");
    }
  }
}

export const authService = new AuthService();
