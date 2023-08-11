import multer from 'multer';
import { v4 as uuid } from "uuid";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const { session: { sessionSecret } } = config;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination:  "./images",
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

export const generateToken = (userId) => {
  return jwt.sign({userId}, sessionSecret);
}

export const generateUniqueToken = () => {
  return uuid();
}

export const calculateExpirationDate = () => {
  const now = new Date();
  const expirationDate = new Date(now.getTime() + 1 * 60 * 60 * 1000);
  return expirationDate;
}

export const calculateUserExpirationDatebyCreation = (created_at) => {
  const now = created_at.getTime();
  const expirationDate = new Date(now + 48 * 60 * 60 * 1000);
  return expirationDate;
}