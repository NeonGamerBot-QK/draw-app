let express = require("express"), app = express()
app.use(express.static(__dirname)), app.listen(process.env.PORT || process.env.SERVER_PORT || 2023)