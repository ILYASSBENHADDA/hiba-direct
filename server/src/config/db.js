const mongoose = require('mongoose')
const DB_URI = process.env.MONGO_URI

// Connection
mongoose.connect(DB_URI, {
     useNewUrlParser: true,
     useUnifiedTopology: true,
     useFindAndModify: false,
     useCreateIndex: true,
}).then(()=> {
     console.log('Connected to Database')
}).catch((err) => {
     console.log(`Error connection to the Database: ${err}`)
})