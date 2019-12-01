const path = require('path');
const express = require('express'); //node way of importing third party library
const app = express();
const publicPath = path.join(__dirname, '..', 'public');  //'..' means go out the server folder inorder to find the path to serve up our public asset
const port = process.env.PORT || 3000;   //heroku use this process.env.PORT to generate dynamic port number and server up the public asset to browser while port 3000 is to server up the public asset on the local machine

app.use(express.static(publicPath));

app.get('*', (req, res) => {   //'*' represent all the pages or route in the application
    res.sendFile(path.join(publicPath, 'index.html'));  //if the page a user want is not in the public folder just return the index instead of return error 404. When you refresh any page its return error 404 but with this setting its will return index page instead.   
});

app.listen(port, () => {
    console.log('server is up');
});
