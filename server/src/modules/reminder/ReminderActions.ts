import type { RequestHandler } from "express";
import reminderRepository from "./ReminderRepository";

export const browse: RequestHandler = async (req, res, next) => {
  try {
    const reminders = await reminderRepository.readAll();
    res.json(reminders);
  } catch (err) {
    next(err);
  }
};

export const read: RequestHandler = async (req, res, next) => {
  try {
    const reminder = await reminderRepository.read(Number(req.params.id));
    if (!reminder) {
      res.status(404).json({ message: "Reminder not found" });
    } else {
      res.json(reminder);
    }
  } catch (err) {
    next(err);
  }
};

export const add: RequestHandler = async (req, res, next) => {
  try {
    const result = await reminderRepository.create(req.body);
    res.status(201).json({ id: result.insertId });
  } catch (err) {
    next(err);
  }
};

export const edit: RequestHandler = async (req, res, next) => {
  try {
    await reminderRepository.update(Number(req.params.id), req.body);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export const destroy: RequestHandler = async (req, res, next) => {
  try {
    await reminderRepository.delete(Number(req.params.id));
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};