const fs = require("fs");
const http = require("http");
const url = require("url");
const templateReplace = require('./utils/templateReplace')

// reading templates 
const overviewTemp = fs.readFileSync("./templates/overview.html", "utf-8")
const productCardTemp = fs.readFileSync("./templates/productCard.html", "utf-8");
const productTemplate = fs.readFileSync("./templates/product.html", "utf-8")

// reading products data
const products = JSON.parse(fs.readFileSync("./data/products.json", "utf-8"))

// server
const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);
    // Overview Page or Home Page
    if (pathname === "/" || pathname === "/overview") {
        // injecting products data in product card html template 
        const cardsHtml = products.map(product => templateReplace(productCardTemp, product))
        // injecting products card template in overview template 
        const output = overviewTemp.replace("{%Products_cards%}", cardsHtml);
        // setting headers 
        res.writeHead(200, { "content-type": "type of content", "X-Powered-By": "Node.js" })
        // sending response 
        res.end(output);
        // sending response 
    } else if (pathname === "/product") {
        // find product
        const product = products[query?.id];
        // injecting product details in product template 
        const html = templateReplace(productTemplate, product);
        // setting headers
        res.writeHead(200, { "content-type": "type of content", "X-Powered-By": "Node.js" })
        // sending response
        res.end(html);
    }
    else {
        // setting headers
        res.writeHead(200, { "content-type": "type of content", "X-Powered-By": "Node.js" })
        // sending response
        res.end("<h1>Not Found</h1>");
    }
})

const PORT = 3000 || 3001
server.listen(PORT, "0.0.0.0", () => {
    console.log(`node-farm server is running at PORT : ${PORT}`)
})