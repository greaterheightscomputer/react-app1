const path = require('path');
const express = require('express'); //node way of importing third party library
const app = express();
const publicPath = path.join(__dirname, '..', 'public');  //the path to serve up our public asset
const port = process.env.PORT || 3000;   

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log('server is up');
});
