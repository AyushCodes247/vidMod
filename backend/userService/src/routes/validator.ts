import { body } from "express-validator";

export const registerBodyValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required.")
    .isString()
    .withMessage("Name must be a string.")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters."),

  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),

  body("gender")
    .optional()
    .isString()
    .isIn(["male", "female", "others", "prefer_not_to_say"])
    .withMessage("Invalid gender value.")
    .default("prefer_not_to_say"),
];

export const loginBodyValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isString()
    .withMessage("Password must be a string.")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long."),
];
