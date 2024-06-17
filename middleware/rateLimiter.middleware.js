const rateLimit = require('express-rate-limit')


// In the future: add redis for persistence
const limiter = rateLimit({
    windowMs: 10 * 1000,
    max: 10,
})

module.exports = {
    limiter
}
