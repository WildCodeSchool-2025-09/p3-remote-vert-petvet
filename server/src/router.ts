import express from "express";
import consultAction from "../database/modules/consult/consultAction";

const router = express.Router();

router.get("/consult/pet/:id", consultAction.readByConsult);
//router.post("/consult", consultAction.add);

export default router;
