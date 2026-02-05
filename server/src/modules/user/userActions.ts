import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "./userRepository";
import type { User } from "./userRepository";

const add: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body as User;
    const newUserId = await userRepository.insert(body);

    res.status(StatusCodes.CREATED).json({ newUserId });
  } catch (err) {
    next(err);
  }
};

export default { add };
