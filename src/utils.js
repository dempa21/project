import multer from 'multer';

import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import { faker } from '@faker-js/faker/locale/es';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${__dirname}/public/images`);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
export default __dirname;

export const createHash = (password) => 
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) => 
  bcrypt.compareSync(password, user.password);

export const generateProducts = () => {
  let numOfProducts = faker.number.int({min: 10, max: 20});

  let products = [];

  for (let i = 0; i < numOfProducts; i++) {
  products.push(generateProduct());
  }
  return products;
};

export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    code: faker.string.alphanumeric(8),
    stock: faker.number.int({min: 0, max:100})
  }
};