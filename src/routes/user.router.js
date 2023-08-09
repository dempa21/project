import { Router } from "express";
import { changeRole, getUsers, deleteUser, deleteUsers, modifyprofile, updateUser } from "../controllers/user.controller.js";
import { authentication } from "../middlewares/authentication.js";
import { authorize } from "../middlewares/authorization.js";

const router = Router();

router.get('/', getUsers);
router.get('/delete', deleteUsers);
router.post("/deleteUser", authentication(true), authorize(['admin']), deleteUser);
router.get('/modifyprofile/:uid', authentication(true), authorize(['admin']), modifyprofile);
router.post('/updateUser', authentication(true), authorize(['admin']), updateUser);
router.post('/premium/:id', authentication(), authorize(['admin']), changeRole);

export default router;