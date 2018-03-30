const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const Mixed=Schema.Types.Mixed;

const movieSchema=new Schema({
    doubanId:String,
    
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updatedAt:{
            type:Date,
            default:Date.now()
        }
    }
});

movieSchema.pre('save',next=>{
    if(this.isNew){
        this.meta.createdAt=this.meta.updatedAt=Date.now();
    }else{
        this.updatedAt=Date.now();
    }
})

mongoose.model('Movie',movieSchema);