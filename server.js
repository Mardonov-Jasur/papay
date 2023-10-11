const http = require ('http');
const mongodb = require ("mongodb")

let db;
const connectionString = "mongodb+srv://Jasur:ropdFQ6AuB3TmckJ@cluster0.tgyh4h9.mongodb.net/Reja?retryWrites=true&w=majority"

mongodb.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (err, client) => {
    if(err) console.log("ERROR on connection MongoDB");
    else {
        console.log("MongoDB connection succed");
        module.exports = client;
        const app = require("./app")
        const server = http.createServer(app);
        let PORT = 5001;
        server.listen(PORT, function () {
         console.log(`The server is running succesful om PORT ${PORT}, http://localhost:${PORT}`);
    })  
    }
});

//Jasur