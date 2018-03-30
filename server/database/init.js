const mongoose=require('mongoose');
const db='mongodb://test:123456@106.14.166.125:41030/test';
mongoose.Promise=global.Promise;

exports.connect=()=>{
    let maxConnectTimes=0;

    return new Promise((resolve,reject)=>{
        if(process.env.NODE_ENV!=='production'){
            mongoose.set('debug',true);
        }

        mongoose.connect(db);

        mongoose.connection.on('disconnceted',()=>{
            
        })

        mongoose.connection.on('error',(error)=>{
            maxConnectTimes++;
            if(maxConnectTimes<5){
                mongoose.connect(db);
            }else{
                throw new Error('database error!');
            }
        })

        mongoose.connection.once('open',()=>{
            resolve();
            console.log('MongoDB connected successfully!');
        })
    })
}
