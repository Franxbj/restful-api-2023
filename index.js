const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//dummy 'database'
let products = [   
    { id: 1, name: 'Chair', price: 100 },   
    { id: 2, name: 'Table', price: 200 }   
];

// GET all PRODUCTS
app.get('/api/products', (req, res) => {
    res.json(products);
});

// GET ONE http://localhost:5000/api/products/2
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
    
});

// DELETE http://localhost:5000/api/products/2
app.delete('/api/products/:id', (req,res)=> {
    const id = Number(req.params.id);
     
    products = products.filter(product => product.id !== id);

    res.json(products);
    
})


// CREATE A PRODUCT http://localhost:5000/api/products
app.post('/api/products', (req,res) => {
    //console.log(req.body.name);
    //res.send("ok");

    if (!req.body.name || !req.body.price)
    {
        res.status(400).json(
            { msg: 'Name or price was not sent'}
        )
    }
    else 
    {
        const newId = products[products.length-1].id +1;

        const newProduct = { 
            id : newId,
            name : req.body.name,
            price : req.body.price
        }
    
        products.push(newProduct);
    
        res.json(products); 
    }
    

});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));