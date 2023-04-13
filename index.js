const express = require('express');

const app = express();

//dummy 'database'
let products = [   
    { id: 1, name: 'Chair', price: 100 },   
    { id: 2, name: 'Table', price: 200 }   
];

// GET all PRODUCTS
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET ON http://localhost:500/api/products/2
app.get('/api/products/:id', (req, res) => {
    const id = Number(req.params.id);
    const product = products.find(product => product.id === id);

    if (product)
    {
        res.json(product);
    }
    else
    {
        res.status(404).json(
            {
                msg: 'Not found'
            }
        )
    }
    //res.json(product);    
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));