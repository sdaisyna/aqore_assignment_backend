const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SalesTransaction = require("../models/salestransaction");

const router = express.Router();



//Routes for order operated by user
router.route("/")
    .get((req, res, next) => {
        SalesTransaction.find()
            .populate({
                path: "product"
            })
            .populate({
                path: "customer"
            })
            .then(sales => {
                if (sales == null) throw new Error("No order available.");
                res.json(sales);
            })
    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .delete((req, res, next) => {
        SalesTransaction.deleteMany()
            .then(response => {
                console.log("All sales transaction deleted.")
                res.json(response);
            })
            .catch(next);
    });


//Routes for orders with id
router.route("/:sid")
    .get((req, res, next) => {
        SalesTransaction.findOne({ _id: req.params.sid })
            .populate({
                path: 'product'
            })
            .then(sales => {
                if (sales == null) throw new Error(" Sales transaction has been removed. ");
                res.json(sales);

            })
            .catch(next);
    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })


    module.exports = router;





