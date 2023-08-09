import { userService } from "../../services/index.js";

const button = document.getElementById("button");
const { userId } = req.body;


button.addEventListener("click", async function(userId) {

    const deleteOne = await userService.delete(userId);
    res.send({message: "Success, user deleted", payload : deleteOne})
  });