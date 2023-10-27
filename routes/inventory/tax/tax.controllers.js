const { getPagination } = require("../../../utils/query");
require("dotenv").config();
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();
//const prisma = require('../prisma');

const createSingleTax = async (req, res) => {
 try {
    const taxType = req.body.type;
    const taxName = req.body.name;
    const taxRate = req.body.rate;

    const taxExists = await prisma.tax.findUnique({
      where: {
        type_name: { type: taxType, name: taxName },
      },
    });

    if (taxExists) {
      throw new Error('Tax already exists');
    }

    const createdTax = await prisma.tax.create({
      data: {
        type: taxType,
        name: taxName,
        rate: taxRate,
      },
    });
    res.json(createdTax);
 } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
 }
};

const getAllTax = async (req, res) => {
 try {
    const getAllTax = await prisma.tax.findMany({
      orderBy: {
        id: "asc",
      },
    });
    res.json(getAllTax);
 } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
 }
};

const getSingleTax = async (req, res) => {
 try {
    const singleTax = await prisma.tax.findUnique({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(singleTax);
 } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
 }
};

const updateSingleTax = async (req, res) => {
 try {
    const updatedTax = await prisma.tax.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        type: req.body.type,
        name: req.body.name,
        rate: req.body.rate,
      },
    });
    res.json(updatedTax);
 } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
 }
};

const deleteSingleTax = async (req, res) => {
 try {
    const deletedTax = await prisma.tax.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json(deletedTax);
 } catch (error) {
    res.status(400).json(error.message);
    console.log(error.message);
 }
};

module.exports = {
 createSingleTax,
 getAllTax,
 getSingleTax,
 updateSingleTax,
 deleteSingleTax,
};