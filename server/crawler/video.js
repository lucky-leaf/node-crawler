const puppeteer=require('puppeteer');
const base='https://movie.douban.com/subject/';
const doubanId='26967920'
const videoBase='https://movie.douban.com/trailer/228992';

(async ()=>{
    console.log('Start visit the targe page...');
    const browser=await puppeteer.launch({
        args:['--no-sandbox'],
        dumpio:false,
    });
    const page=await browser.newPage();
    await page.goto(base+doubanId,{
        waitUntil:'networkidle2'
    });
    await page.waitFor(1000);
    
    const result=await page.evaluate(()=>{
        const $=window.$;
        const it=$('.related-pic-video');

        if(it && it.length>0){
            let link=it.attr('href');
            let cover=it.find('img').attr('src');
            return {
                link,cover
            }
        }
        return {};
    });
    let video;
    if(result.link){
        await page.goto(result.link,{
            waitUntil:'networkidle2'
        });
        await page.waitFor(2000);
        video=await page.evaluate(()=>{
            const $=window.$;
            let it=$('source');
            if(it && it.length>0){
                return it.attr('src');
            }
            return '';
        })
    }
    const data={
        video,doubanId,cover:result.cover
    }

    await browser.close();
    process.send(data);
    process.exit(0);
})();