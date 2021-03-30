const PASSWORD = process.env.DB_PASSWORD
const USERNAME = process.env.DB_USERNAME


module.exports = {uri: `mongodb+srv://${USERNAME}:${PASSWORD}@ams.uzytx.mongodb.net/ams?retryWrites=true&w=majority`}
