
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true , useUnifiedTopology: true })
mongoose.connection.once('open',()=>console.log('connection successfull')
).on('error',(error)=>{
    console.log("the error is",error)
});
const kittySchema = new mongoose.Schema({
    name: String
  });
kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  }
  
const Kitten = mongoose.model('Kitten', kittySchema);  
const silence = new Kitten({ name:'BijoY' });
console.log(silence.name); // 'Silence'
silence.speak()