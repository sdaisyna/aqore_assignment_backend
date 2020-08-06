const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const customerRouter = require('./routes/customer');
const salesRouter = require('./routes/salestransaction');
const invoiceRouter = require('./routes/invoice');
const uploadRouter = require('./routes/uploads');


const dotenv = require('dotenv').config();
const cors = require('cors');


const app = express();
app.options('*', cors());
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.static(__dirname + "/public"));


mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then((db) => {
        console.log("Successfully connected to database server");
    }, (err) => console.log(err));


app.use('/user', userRouter);
app.use('/customer', customerRouter);
app.use('/product', productRouter);
app.use('/sales', salesRouter);
app.use('/invoice', invoiceRouter);
app.use('/upload', uploadRouter);



app.use((err, req, res, next) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.json({ status: err.message });
    });

app.listen(process.env.PORT, () => {
        console.log(`App is running at localhost:${process.env.PORT}`);
    });
