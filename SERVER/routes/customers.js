import express from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword, comparePassword } from '../lib/utility.js';
import PasswordValidator from 'password-validator';

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

    //Password validation all from https://www.npmjs.com/package/password-validator
    let schema = new PasswordValidator();

    schema
        .is().min(8)
        .has().digits(1)
        .has().uppercase(1)
        .has().lowercase(1)

    schema.validate(password);

    if (!schema.validate(password)) {
        return res.status(400).send("Password does not meet requirements. Must contain at least 8 characters, 1 digit, 1 uppercase letter, and 1 lowercase letter")
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
    req.session.customer_id = existingCustomer.customer_id;
    req.session.email = existingCustomer.email;
    req.session.firstName = existingCustomer.firstName;
    req.session.lastName = existingCustomer.lastName;

    //send response
    res.json({ 'Customer email': existingCustomer.email });
});

//logout route
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.send('User logged out');
});

//getsession route
router.get('/getsession', (req, res) => {
    if (req.session.customer_id) {
        res.json({
            'Customer ID': req.session.customer_id,
            'Email': req.session.email,
            'First name': req.session.firstName,
            'Last name': req.session.lastName
        });
    } else {
        return res.status(401).send("Not logged in")
    }
});

export default router;