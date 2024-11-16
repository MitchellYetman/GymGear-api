import express from 'express';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';

const router = express.Router();

const prisma = new PrismaClient();

//get all products
router.get('/all', async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
});

// Get product by id
router.get('/:id', async (req, res) => {

    const id = req.params.id;

    //validate id is a number
    if (isNaN(id)) {
        return res.status(400).json({
            message: "Invalid product id"
        })
    }

    //ensure the product exists
    const product = await prisma.product.findUnique({
        where: {
            id: parseInt(id)
        },
    })

    //errors
    if (product) {
        res.json(product);
    }
    else {
        res.status(404).json({ message: 'Product not found.' })
    }
});

//purchase
router.post('/purchase', async (req, res) => {
    res.send("Purchase route");
});
