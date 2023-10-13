const dotenv = require("dotenv");
dotenv.config();

const http = require ('http');
const mongoose = require ("mongoose")

const connectionString = process.env.MONGO_URL;


mongoose
 .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log ("Mongoose Connected Successfully");
        const app = require("./app")
        const server = http.createServer(app);
        let PORT = process.env.PORT || 5001;
        server.listen(PORT, function () {
         console.log(`The server is running succesful om PORT ${PORT}, http://localhost:${PORT}`);
    });
})
.catch((err) => {
    console.log("ERROR on connection MongoDB");
});
// mongoose.connect(connectionString, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }, (err, goose) => {
//     if(err) console.log("ERROR on connection MongoDB");
//     else {
//         console.log("MongoDB connection succed");
//         console.log(mongoose);
//         const app = require("./app")
//         const server = http.createServer(app);
//         let PORT = process.env.PORT || 5001;
//         server.listen(PORT, function () {
//          console.log(`The server is running succesful om PORT ${PORT}, http://localhost:${PORT}`);
//     })  
//     }
// });