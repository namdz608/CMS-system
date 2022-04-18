const express = require('express');
const bodyParser = require('body-parser');
const viewEngine = require("./config/viewEngine");
const initWebRoute = require("./route/router");
const connectDb = require("./config/connectDb");
const path = require('path');


var cors = require('cors')
const app = express();



app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

// app.use(express.static('my-app/build'))


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('my-app/build'))
        // app.get('*', (req, res) => {
        //     res.sendFile(path.join(__dirname, 'my-app', 'build', 'index.html'))
        // })
}
viewEngine(app);
initWebRoute(app);
connectDb();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("server up and running " + PORT);
});