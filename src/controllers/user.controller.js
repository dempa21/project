import { userService } from "../services/index.js";
import { apiResponser } from "../traits/ApiResponser.js";
import { GetProfile } from "../dao/dtos/getProfile.js";

export async function changeRole(req, res) {
    try {
        const { id } = req.params;
        const result = await userService.changeRole(id);
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function getUsers(req, res) {
    try {
        const result = await userService.getUsers();
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function deleteUser(req, res) {
    try {
        const { userId } = req.body;
    // Update the user property in MongoDB
        const deleteOne = await userService.deleteById(userId);
        res.send({message: "Success, user deleted", payload : deleteOne})
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }

}

export async function deleteUsers(req, res) {
    try {
        const result = await userService.runCleanup();
        return apiResponser.successResponse(res, result);
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
}

export async function modifyprofile(req, res) {
    try {
        const { uid } = req.params;
        const user = await userService.findById(uid);
        const getProfile = new GetProfile(user);
        res.render('modifyprofile', { user: getProfile });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }
};

export async function updateUser(req, res) {
    try {
        const { userId, property, value } = req.body;
    // Update the user property in MongoDB
    const update = await userService.updateOne(userId, property, value);
    res.send({message: "success", payload: update });
    } catch (error) {
        return apiResponser.errorResponse(res, error.message);
    }

}