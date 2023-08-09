import { CartService } from "./cart.service.js";
import { ProductService } from "./products.service.js";
import { TicketService } from "./ticket.service.js";
import { UserService } from "./user.service.js";
import { RestoreService } from "./restore.service.js";
import { LoginService } from "./login.service.js";


export const cartService = new CartService();
export const productService = new ProductService();
export const ticketService = new TicketService();
export const userService = new UserService();
export const restoreService = new RestoreService();
export const loginService = new LoginService();