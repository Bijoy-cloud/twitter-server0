const express = require('express')
const cors = require('cors')
const port = process.env.PORT || 3000;
const mongoose = require('mongoose')
// mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/test" ,{ useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connect( "mongodb+srv://Bijoy-admin:BiJoY123@@cluster0.diobp.mongodb.net/myFirstDatabase0?retryWrites=true&w=majority" ,{ useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connection.once('open',()=>console.log('DB connection successfull')
).on('error',(error)=>{
    console.log("the error is",error)
});
const db = mongoose.connection;
const kittySchema = new mongoose.Schema({
    name: String,
    content: String
  });

const Kitten = mongoose.model('Kitten', kittySchema);  
const app = express()  
app.use(express.json())
app.use(cors())
// const db = monk(process.env.MONGO_URI || 'localhost/meower');
// const mews = db.get('mews'); //gettting the collection or create it
function validmew(mew){
    return (mew.name && mew.name.toString().trim())&&
    (mew.content && mew.content.toString().trim())
}

app.get('/',(req,res)=>{
    res.json({
        message : 'meower'
    })
})
app.get('/mews', (req, res) => {
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);
        res.json(kittens);
      })
  });
app.post('/mews',(req,res)=>{
    
    if (validmew(req.body)){
        // insert to db
        console.log('Success')
        const mew={
            name:req.body.name.toString(),
            content:req.body.content.toString(),
        
        }
        const kitty = new Kitten({
             name: mew.name,
             content:mew.content

     })
     res.json(kitty)
     kitty.save()
         // mews
        // .insert(mew)
        // .then(createdMew => {
        //   res.json(createdMew);
        //   console.log('backend done')
        // })


    }
    else{
        res.status(422)//unprocessable request
        console.log('falilure')
        res.json({
            message:'name and content are required'
        })
    }
})


app.listen(port,()=>console.log('listenting at 30000'));