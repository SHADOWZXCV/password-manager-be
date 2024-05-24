const rateLimit = require('express-rate-limit')


// In the future: add redis for persistence
const limiter = rateLimit({
    windowMs: 15 * 1000, // 15 seconds
    max: 10, // limit each IP to 100 requests per windowMs
})

module.exports = {
    limiter
}
