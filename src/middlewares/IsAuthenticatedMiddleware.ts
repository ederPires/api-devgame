import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";
import jwt from "jsonwebtoken";

export const IsAuthenticated: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new Error("Not authenticated");
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY || "your_secret_key");
    context.payload = payload as any;
  } catch (err) {
    throw new Error("Not authenticated");
  }

  return next();
};
