const express = require('express');

const Invoice = require("../models/invoice");

const router = express.Router();


//Routes to generate invoice

router.route("/")
    .get((req, res, next) => {
        Invoice.find()
            .populate({
                path: "salestransaction"
            })
            .populate({
                path: "customer"
            })
            .populate({
                path: "product"
            })
            .then(invoice => {
                if (invoice == null) throw new Error("No invoice found.");
                res.json(invoice);
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
        Invoice.deleteMany()
            .then(response => {
                console.log("All invoice  deleted.")
                res.json(response);
            })
            .catch(next);
    });


//Routes to generate invoice with id 
router.route("/:iid")
    .get((req, res, next) => {
        Invoice.findOne({ _id: req.params.iid })
            .populate({
                path: 'product'
            })
            .then(transaction => {
                if (transaction == null) throw new Error(" Sales transaction has been removed. ");
                res.json(transaction);

            })
            .catch(next);
    })

    module.exports = router;
