const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const Product = require('../models/product');

const { response } = require('express');
const router = express.Router();

//Routes for product
router.route("/")
    .get((req, res, next) => {
        Product.find()
            .then(product => {
                if (product == null) throw new Error("No products found.");
                res.json(product)
            })
            .catch(next);
    })

    .post((req, res, next) => {
        let product = new Product(req.body);
        product.save()
            .then(product => {
                res.statusCode = 201;
                res.json(product);
            })
            .catch(next);
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .delete((req, res, next) => {
        Product.deleteMany()
            .then(response => {
                console.log("All product deleted. ")
                res.json(response);
            })
            .catch(next);
    })


//Routes for product with id
router.route("/:id")
    .get((req, res, next) => {
        Product.findOne({ _id: req.params.id })
            .then(product => {
                if (product == null) throw new Error("No product found");
                res.json(product);
            })
            .catch(next);

    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed. " });
    })

    .put((req, res, next) => {
        Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true })
            .then(reply => {
                if (reply == null) throw new Error("No product updated.")
                res.json(reply);
            })
            .catch(next);
    })

    .delete((req, res, next) => {
        Product.findOneAndDelete({ _id: req.params.id })
            .then(response => {
                console.log("Product deleted successfully.")
                res.json(response);
            })
            .catch(next);
    })

    module.exports = router;