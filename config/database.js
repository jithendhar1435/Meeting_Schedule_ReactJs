import mongoose from "mongoose";

const connectDB=()=>{
    mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((data) => {
        console.log(`connected with mongodb ${data.connection.host}`)
    }).catch((err) => {
        console.log(err)
    })
}

export default connectDB