import type { RequestHandler } from "express";
import userRepository from "./userRepository";
import type { User } from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const newUser = {
      email: req.body.email,
      hashed_password: req.body.hashed_password,
    };
    const body = req.body as User;
    const newUserId = await userRepository.create(body);

    res.sendStatus(422).json({ newUserId });
  } catch (err) {
    next(err);
  }
};

export default { add };
