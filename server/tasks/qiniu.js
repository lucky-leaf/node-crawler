const qiniu=require('qiniu');
const nanoid=require('nanoid');
const config=require('../config');

const bucket=config.qiniu.bucket;
const mac=new qiniu.auth.digest.Mac(config.qiniu.AK,config.qiniu.SK);
const cfg=new qiniu.conf.Config();
const bucketManager=new qiniu.rs.BucketManager(mac,cfg);

const uploadToQiniu=async (resUrl,key)=>{
    return new Promise((resolve,reject)=>{
        bucketManager.fetch(resUrl,bucket,key,(err,respBody,respInfo)=>{
            if(err){
                reject(err);
            }else{
                if(respInfo.statusCode===200){
                    resolve({key});
                }else{
                    reject(respInfo);
                }
            }
        })
    })
};

(async ()=>{
    let movies=[
        { video: 'http://vt1.doubanio.com/201803270126/c2741b59489caea8bd115c6a6b9d52c8/view/movie/M/302260847.mp4',
        doubanId: '26654498',
        poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2501892505.jpg',
        cover: 'https://img3.doubanio.com/img/trailer/medium/2512151806.jpg?' }
    ];
    movies.map(async movie=>{
        if(movie.video && !movie.key){
            try{
                let videoData=await uploadToQiniu(movie.video,nanoid()+'.mp4');
                let posterData=await uploadToQiniu(movie.poster,nanoid()+'.jpg');
                let coverData=await uploadToQiniu(movie.cover,nanoid()+'.jpg');
                if(videoData.key){
                    movie.videoKey=videoData.key;
                }
                if(posterData.key){
                    movie.posterKey=posterData.key;
                }
                if(coverData.key){
                    movie.coverKey=coverData.key;
                }
                console.log(movie);
                // { 
                //     video: 'http://vt1.doubanio.com/201803270126/c2741b59489caea8bd115c6a6b9d52c8/view/movie/M/302260847.mp4',
                //     doubanId: '26654498',
                //     poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2501892505.jpg',
                //     cover: 'https://img3.doubanio.com/img/trailer/medium/2512151806.jpg?',
                //     videoKey: 'http://p6erybxbt.bkt.clouddn.com/BqBi4A2iazL7QMFudfCYU.mp4',
                //     posterKey: 'http://p6erybxbt.bkt.clouddn.com/5LsTa1ZFBP1NPy_2nqYvJ.jpg',
                //     coverKey: 'http://p6erybxbt.bkt.clouddn.com/Z4PjnOsHvNpYPmK_F~DBO.jpg' }
            }catch(err){
                console.log(err);
            }
        }
    })
})();
