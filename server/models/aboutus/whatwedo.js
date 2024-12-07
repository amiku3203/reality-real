const mongoose = require('mongoose')


const whatSchema = new mongoose.Schema({
      services:[
        {
            title:{ type: String, required: true },
            description: { type: String, required: true},
        }
      ],
      description: { type: String, required: true},

},{
    timestamps : true
})


const whatDo =  mongoose.model("what",whatSchema)


module.exports =  whatDo