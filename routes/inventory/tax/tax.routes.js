const express = require("express");
const {
    createSingleTax,
    getAllTax,
    getSingleTax,
    updateSingleTax,
    deleteSingleTax,
} = require("./tax.controllers");
const authorize = require("../../../utils/authorize"); // authentication middleware

const taxRoutes = express.Router();

taxRoutes.post(
  "/",
  authorize("create-tax"),
  createSingleTax
);
taxRoutes.get(
  "/",
  authorize("read-tax"),
  getAllTax
);
taxRoutes.get(
  "/:id",
  authorize("read-tax"),
  getSingleTax
);
taxRoutes.put(
  "/:id",
  authorize("update-tax"),
  updateSingleTax
);
taxRoutes.delete(
  "/:id",
  authorize("delete-TAX"),
  deleteSingleTax
);

module.exports = taxRoutes;
