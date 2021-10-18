const mongoose = require('mongoose');
async function connect(){
    try {
         await mongoose.connect('mongodb://localhost:27017/Node',
         { 
             useNewUrlParser: true, 
             useUnifiedTopology: true 
         });
          console.log('Connected')
          
    } catch (error) {
            console.log('Error connecting');
    }
}

module.exports = {connect};
