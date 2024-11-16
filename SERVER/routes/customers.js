import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';
import multer from 'multer';

const router = express.Router();

const prisma = new PrismaClient();

router.post('/signup', async (req, res) => {

    //get customer input
    const { email, password, firstName, lastName } = req.body;

    //validate inputs
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).send('Missing required fields');
    }

    //check if customer already exists
    const existingCustomer = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });
    if (existingCustomer) {
        return res.status(400).send('Customer already exists');
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    //add customer to database
    const customer = await prisma.customer.create({
        data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        },
    });

    //send response
    res.json({ customer });
});

//login route
router.post('/login', async (req, res) => {

    //get customer inputs
    const { email, password } = req.body;

    //validate input
    if (!email || !password) {
        return res.status(400).send('Missing required fields');
    }

    //find customer in database
    const existingCustomer = await prisma.customer.findUnique({
        where: {
            email: email,
        }
    });
    if (!existingCustomer) {
        return res.status(404).send('Customer not found');
    }

    //compare/verify password
    const passwordMatch = await comparePassword(password, existingCustomer.password);
    if (!passwordMatch) {
        return res.status(401).send('Invalid password');
    }

    //setup customer session
    req.session.email = existingCustomer.email;
    req.session.customer_id = existingCustomer.id;
    req.session.name = existingCustomer.firstName + ' ' + existingCustomer.lastName;

    //send response
    res.send('Login route');
});

//logout route
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('Logout route');
});

//getsession route
router.get('/getsession', (req, res) => {
    res.json({ 'customer': req.session.email });
});

export default router;