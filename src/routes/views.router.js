import { Router } from "express";

import { checkLogged, isProtected, checkSession } from "../middlewares/auth.js";
import { getCarts, addCart, getCartById, addProducts, deleteAllProducts, updateProductQuantity } from "../controllers/carts.controller.js";
import { getProducts, getPaginatedProducts, getProductById, updateProduct  } from "../controllers/products.controller.js";
import { getMessages } from "../controllers/messages.controller.js";

const router = Router();


router.get("/", isProtected, async (req, res) => {
  const options = {
    query: {},
    pagination: {
      limit: req.query.limit ?? 10,
      page: req.query.page ?? 1,
      lean: true,
      sort: {},
    },
  };

  if (req.query.category) {
    options.query.category = req.query.category;
  }

  if (req.query.status) {
    options.query.status = req.query.status;
  }

  if (req.query.sort) {
    options.pagination.sort.price = req.query.sort;
  }

  const {
    docs: products,
    totalPages,
    prevPage,
    nextPage,
    page,
    hasPrevPage,
    hasNextPage,
  } = await getPaginatedProducts(options);

  const link = "/?page=";

  const prevLink = hasPrevPage ? link + prevPage : link + page;
  const nextLink = hasNextPage ? link + nextPage : link + page;

  return res.render("home", {
    products,
    totalPages,
    page,
    hasNextPage,
    hasPrevPage,
    prevLink,
    nextLink,
    title: "Products",
    user: req.session.user,
  });
});

router.get("/product/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await getProductById(productId);
  res.render("product", { title: "Product Details", product });
});

router.get("/cart", async (req, res) => {
  const cart = await getCartById("6440b66102acad1337350cc8");
  res.render("cart", { products: cart.products, title: "Cart Items" });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await getProducts();
  res.render("realtime-products", {
    products,
    style: "styles.css",
    title: "Real Time Products",
  });
});

router.get("/chat", async (req, res) => {
  const messages = await getMessages();
  return res.render("messages");
});

router.get("/login", checkSession, (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", checkLogged, (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/", isProtected, (req, res) => {
  res.render("profile", { user: req.session.user });
});

export default router;
