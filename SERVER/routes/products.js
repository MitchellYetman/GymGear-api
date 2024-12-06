import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();

const prisma = new PrismaClient();

//get all products
router.get('/all', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// Get product by id
router.get('/:id', async (req, res) => {

    const product_id = req.params.id;

    //validate id is a number
    if (isNaN(product_id)) {
        return res.status(400).json({
            message: "Invalid product id"
        })
    }

    //ensure the product exists
    const product = await prisma.product.findUnique({
        where: {
            product_id: parseInt(product_id)
        },
    })

    //errors
    if (product) {
        res.json(product);
    }
    else {
        return res.status(404).json({ message: 'Product not found.' })
    }
});

//purchase
router.post('/purchase', async (req, res) => {

    //ensure a user is logged in. just using !req.session didn't work, so I just used one of the variables
    if (!req.session.customer_id) {
        return res.status(401).send("Unauthorized. Must be logged in to continue purchase")
    }

    //request body
    const { street, city, province, country, postal_code, credit_card, credit_expire, credit_cvv } = req.body

    //ensure all fields are filled in
    if (!street || !city || !province || !country || !postal_code || !credit_card || !credit_expire || !credit_cvv) {
        return res.status(400).json({
            message: 'Required fields must have a value'

        })
    }

    //calculating subtotal to fill in invoice fields
    // const cartArray = cart.split(",");
    // let subtotal = 0;

    // for (const id of cartArray) {
    //     const product = await prisma.product.findUnique({
    //         where: {
    //             product_id: parseInt(id)
    //         }
    //     })

    //     subtotal += parseFloat(product.cost)
    // }

    //add purchase to purchase table in database
    const purchase = await prisma.purchase.create({
        data: {
            customer_id: req.session.customer_id,
            street: street,
            city: city,
            province: province,
            country: country,
            postal_code: postal_code,
            credit_card: credit_card,
            credit_expire: credit_expire,
            credit_cvv: credit_cvv
        },
    });

    // //
    // //help from ChatGPT with following code
    // //

    // //object to hold id's and respective quantities
    // const counts = {};

    // //add key value pairs to object that updates quantities if a product id is present more than once
    // cartArray.forEach(productID => {
    //     counts[productID] = (counts[productID] || 0) + 1
    // });

    // //create entry in purchaseItem table for each unique product id in the cart
    // for (const productID in counts) {
    //     const purchaseItem = await prisma.purchaseItem.create({
    //         data: {
    //             purchase_id: purchase.purchase_id,
    //             product_id: parseInt(productID),
    //             quantity: counts[productID]
    //         }
    //     })
    // }
    // //
    // //end ChatGPT help section
    // //

    res.status(200).send('Purchase table updated successfully')
});

export default router;