
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/hit-url', async (req, res) => {
    try {
        // Request body to be sent to the URL
        const requestBody = {
            "companyName": req.body.companyName,
            "clientID":req.body.clientID,
            "clientSecret":req.body.clientSecret,
            "ownerName": req.body.ownerName,
            "ownerEmail": req.body.ownerEmail,
            "rollNo": req.body.rollNo
        };
       
        console.log(requestBody);

        const response = await axios.post('http://20.244.56.144/test/auth', requestBody);
        

        console.log('Response:', response.data);

       
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


let products = []; 

app.get('/getprod', async (req, res) => {
  try {
    const bearerToken = req.body.bearerToken;

    if (!bearerToken) {
      return res.status(401).json({ error: 'Missing bearer token' });
    }

    const url = `http://20.244.56.144/test/companies/${req.body.company}/categories/${req.body.category}/products?top=${req.body.top}&minPrice=${req.body.min}&maxPrice=${req.body.max}`;

    const config = {
      headers: { Authorization: `Bearer ${bearerToken}` }
    };

    const response = await axios.get(url, config);

    products = response.data.map((product) => {
      return { ...product, id: Math.floor(Math.random() * 100000) + 1 }; 
    });

    console.log('Products:', products);
    res.json(products);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const bearerToken = req.body.bearerToken;

    if (!bearerToken) {
      return res.status(401).json({ error: 'Missing bearer token' });
    }

    const productId = req.params.id;

    const matchingProduct = products.find((product) => product.id === parseInt(productId));

    if (!matchingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(matchingProduct);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
