const express = require('express');

const Customer = require('../models/customer');

const router = express.Router();


router.route("/")
    .get((req, res, next) => {
        Customer.find()
            .then(customer => {
                if (customer == null) throw new Error("No customer found.");
                res.json(customer)
            })
            .catch(next);
    })


    .post((req, res, next) => {
        let customer = new Customer(req.body);
        customer.save()
            .then(customer => {
                res.statusCode = 201;
                res.json(customer);
            })
            .catch(next);
    })

    .put((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed." });
    })

    .delete((req, res, next) => {
        Customer.deleteMany()
            .then(response => {
                console.log("All customer deleted. ")
                res.json(response);
            })
            .catch(next);
    })


//Routes for cuatomer with id
router.route("/:cid")
    .get((req, res, next) => {
        Customer.findOne({ _id: req.params.cid })
            .then(customer => {
                if (customer == null) throw new Error("No customer found");
                res.json(customer);
            })
            .catch(next);

    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed. " });
    })

    .put((req, res, next) => {
        Customer.findOneAndUpdate({ _id: req.params.cid }, { $set: req.body }, { new: true })
            .then(reply => {
                if (reply == null) throw new Error("No customer updated.")
                res.json(reply);
            })
            .catch(next);
    })

    .delete((req, res, next) => {
        Customer.findOneAndDelete({ _id: req.params.cid })
            .then(response => {
                console.log("Customer deleted successfully.")
                res.json(response);
            })
            .catch(next);
    })

    module.exports = router;



