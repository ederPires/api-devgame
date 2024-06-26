import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../types/MyContext';

export const AuthMiddleware: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error('Não autenticado');
  }
  return next();
};
