const rpn=require('request-promise-native');

async function fetchMovie(item){
    const url=`https://api.douban.com/v2/movie/subject/${item.doubanId}`;
    const res=await rpn(url);
    return res;
};

(async ()=>{
    let movies=[{ doubanId: 20435622,
        title: '环太平洋：雷霆再起',
        rate: 5.8,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2512983475.jpg' },
      { doubanId: 27602137,
        title: '我的大叔',
        rate: 9.1,
        poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2516899481.jpg' }];
    movies.map(async movie=>{
        let movieData=await fetchMovie(movie);
        try {
            movieData=JSON.parse(movieData);
            console.log(movieData.tags);
            console.log(movieData.summary);
        } catch (error) {
            console.log(error);
        }
    })
})();