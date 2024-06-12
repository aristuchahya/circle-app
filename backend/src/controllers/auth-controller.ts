import { Request, Response } from "express";
import { authService } from "../services/auth";

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
      console.log(req.body);
      res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }

  async check(req: Request, res: Response) {
    try {
      res.json(res.locals.user);
    } catch (error) {
      return res.status(400).json({ message: "Bad Request" });
    }
  }
}

export const authController = new AuthController();
