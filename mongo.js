const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.c8rsg.mongodb.net/note-app?retryWrites=true&w=majority`

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log( 'Database Connected' ))
    .catch(err => console.log( err ));


const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)
if( process.argv.length >= 5)
{
    const notecontent = process.argv[3]
    const noteimportant = process.argv[4] === 'true'?true:false
    const note = new Note({
        content: notecontent,
        date: new Date(),
        important: noteimportant, 
    })
    note.save().then(result=>{
        console.log('note saved!')
        mongoose.connection.close()
    })
} 
else if(process.argv.length == 3)
{
    let notes = []
    Note.find({}).then(result=>{
        notes = [...result]
        console.log(notes)
        mongoose.connection.close()
    }
    )

}



/*note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

/*Note.find({}).then(result=>{
    console.log(result)
    result.forEach(note=>{
        console.log(note)
    })
    mongoose.connection.close()
})*/
