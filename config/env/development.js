module.exports = {
    port:   80,
    mongoPort:  27017,
    mongoDatabase:      "mydb",
    mongoServer:        "localhost",
    pageTitle:          "Free Code Camp - Pintrest Clone",
    mongoUrl:           `mongodb://localhost:27017/mydb` || process.env.MONGODB_URI
};