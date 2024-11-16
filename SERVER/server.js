import express from 'express';
import customersRouter from './routes/customers.js';
import productsRouter from './routes/products.js';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors());

//routes
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});