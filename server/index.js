const Koa=require('koa');
const views=require('koa-views');
const {resolve}=require('path');
const {connect}=require('./database/init.js');
const app=new Koa();
(async ()=>{
    await connect();
})();

app.use(views(resolve(__dirname,'./views'),{
    map:{html:'ejs'}
}))

app.use(async (ctx,next)=>{
    ctx.type='text/html'
    await ctx.render('index',{
        you:'World',
        me:'Lucky-Leaf'
    })
});

app.listen(8080,()=>{
    console.log('server is running...');
});