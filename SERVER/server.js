import express from 'express';
import customersRouter from './routes/customers.js';
import productsRouter from './routes/products.js';
import cors from 'cors';
import session from 'express-session'

const port = process.env.PORT || 3000;
const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

//express session setup
app.use(session({
    secret: '0*nhfg-4svf^gdhfu76#Ra2A',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 3600000
    }
}));

//routes
app.use('/api/customers', customersRouter);
app.use('/api/products', productsRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});