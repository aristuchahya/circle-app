import { Request, Response } from "express";
import { authService } from "../services/auth";
import jwt from "jsonwebtoken";
import { transporter } from "../libs/nodemailer";

class AuthController {
  async login(req: Request, res: Response) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/LoginDTO"
                    }  
                }
            }
        } 
    */
    try {
      const user = await authService.login(req.body);
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async register(req: Request, res: Response) {
    /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                       $ref: "#/components/schemas/RegisterDTO"
                    }  
                }
            }
        } 
    */
    try {
      const user = await authService.register(req.body);
      const token = jwt.sign(user.id.toString(), process.env.JWT_SECRET);
      const fullUrl = req.protocol + "://" + req.get("host");

      const info = await transporter.sendMail({
        from: "Circle <namikazeuzumaki43@gmail.com>", // sender address
        to: user.email, // list of receivers
        subject: "Verification Link", // Subject line
        html: `<a href="${fullUrl}/api/v1/auth/verify-email?token=${token}">Klik untuk verifikasi email kamu!</a>`, // html body
      });

      await authService.createVerification(token, "EMAIL");
      console.log(req.body);
      res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  async check(req: Request, res: Response) {
    try {
      res.json(res.locals.user);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async verifyEmail(req: Request, res: Response) {
    try {
      const token = req.query.token as string;
      await authService.verify(token);
      const frontEndUrl = process.env.FRONTEND_URL;
      res.redirect(`${frontEndUrl}/login`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export const authController = new AuthController();
