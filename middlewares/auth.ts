import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const Auth = (req: Request, res: Response, next: NextFunction) => {
  let succcess = false;

  if (req.headers.authorization) {
    const [authType, token] = req.headers.authorization.split(" ");
    if (authType === "Bearer") {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        succcess = true;
        console.log("DECODED", decoded);
      } catch (error) {}
    }
  }
  if (succcess) {
    next();
  } else {
    res.sendStatus(401);
    res.json({ error: "nao autorizado" });
  }
};
    