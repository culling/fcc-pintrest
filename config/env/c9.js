module.exports = {
    port: 8080,
    mongoPort:  27017,
    mongoDatabase:      "mydb",
    mongoServer:        "localhost",
    pageTitle:          "Free Code Camp - Pintrest Clone",
    mongoUrl:           process.env.MONGODB_URI || `mongodb://localhost:27017/mydb`,
    publicHostname:     "localhost"
}