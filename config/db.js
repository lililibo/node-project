const mongoose=require('mongoose');
const url='mongodb://localhost:27017/mz';
mongoose.Promise = global.Promise;
mongoose
    .connect(url,{useMongoClient:true})
    .then(()=>{
        console.log('连接成功')
    })
    .catch((ree)=>{
        console.log('连接失败',err.message)
    })
module.exports=mongoose;