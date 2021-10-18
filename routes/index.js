const authenRoute = require('./auth')
const postRoute = require('./post')

function router(app){
    app.use('/post',postRoute)
    app.use('/api',authenRoute)
    
}
module.exports = {router}