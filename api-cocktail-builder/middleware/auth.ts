import {Request, Response, NextFunction} from 'express';
import {HydratedDocument} from 'mongoose';
import {UserFields, UserMethods} from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields, UserMethods>
}

const auth = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    return res.status(401).send({error: 'Header "Authorization" not found!'});
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    return res.status(401).send({error: 'Token not provided!'});
  }

  const user = await User.findOne({token});

  if (!user) {
    return res.status(401).send({error: 'No such user!'});
  }
  req.user = user;

  return next();
};

export const checkUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  const headerValue = req.get('Authorization');

  if (!headerValue) {
    req.user = undefined;

    return next();
  }

  const [_bearer, token] = headerValue.split(' ');

  if (!token) {
    req.user = undefined;

    return next();
  }

  const user = await User.findOne({token});

  if (!user) {
    req.user = undefined;

    return next();
  }
  req.user = user;

  return next();
};

export default auth;