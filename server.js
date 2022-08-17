const express = require('express');
const cors = require('cors')
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
    origin: 'http://localhost:3000'
}));
require('./routes/author.routes')(app);
require('./config/mongoose.config');

app.listen(8000, () => {
    console.log("Listening at Port 8000")
})

