import { Router } from 'express';
import { generateProduct } from '../utils.js';
import { generateProducts } from '../utils.js';

let products = [];
const router = new Router();

router.get("/", (req, res) => {
    for(let i = 0; i < products.length; i++) {
    products.push(generateProduct());
    }

    res.send({ status: "Success", payload: products})
});

export default router;