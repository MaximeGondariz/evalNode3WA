import { Router } from "express";
import {
  getBooks,
  getBooksByAuthor,
  getOneBook,
  addOneBook,
  updateOneBook,
  deleteOneBook,
} from "./librairy.controller.js";

import verifyPayload from "./../../middleware/verifyPayload.js";

const router = Router();

router.route("").get(getBooks).post(verifyPayload, addOneBook);

router.route("/author/:author").get(getBooksByAuthor);

router.route("/:id").get(getOneBook).put(updateOneBook).delete(deleteOneBook);

export default router;
