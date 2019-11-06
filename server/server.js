const path = require('path');
const express = require('express'); //node way of importing third party library
const app = express();
const publicPath = path.join(__dirname, '..', 'public');  //the path to serve up our public asset
const port = process.env.PORT || 3000;   //heroku use this process.env.PORT to generate dynamic port number and server up the public asset to browser while port 3000 is to server up the public asset on the local machine

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));  //when a request is made by user the index.html page is return inorder to response to user responser and to avoid error 404 
});

app.listen(port, () => {
    console.log('server is up');
});
