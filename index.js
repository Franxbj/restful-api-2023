const express = require('express');

const app = express();




// Custom Middleware (function) that prints the time to console everytime we get a request

/* function logTime(req,res,next){
    // function here
} */

const logTime = (req,res,next) => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const time = `${hours}:${minutes}:${seconds}`;

    // add myVar (canbe anything) property to the request object
    req.myVar = "Some text here"
    
    console.log(`Got a request on ${time}`);

    // Calls the next middleware on a middleware stack
    next();
}

// Call the middleware function
app.use(logTime);

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

    // This one was declared in our custom middleware (logTime)
    console.log(req.myVar);

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

        const url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${newId}`;

        res.location('http://localhost:5000/api/products' + newId);
    
        res.status(201).json(newProduct); 
        
    }
    

});


// UPDATE 
app.patch('/api/products/:id', (req,res) => {
    const idToUpdate = Number(req.params.id);
    const newName = req.body.name;
    const newPrice = req.body.price;
    //console.log(newName);
    //console.log(newPrice);
    //res.send("ok - still developing");


    const product = products.find(product => product.id === idToUpdate)
    if (product)
    {
        product.name = newName;
        product.price = newPrice;

        res.status(200).json(product)
    }
    else 
    {
        res.status(400).json({
            "msg" : "Resource not found"
        })
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));