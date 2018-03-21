const Koa=require('koa');
const views=require('koa-views');
const {resolve}=require('path');
const app=new Koa();

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