import { Router } from "express";
import { changeRole, getUsers } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.get('/', getUsers);
router.post('/premium/:id', authentication(), authorize(['admin']), changeRole);

export default router;