import React, { useEffect, useState } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';


export default function News(props) {
  const [arr, setArr] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [total, setTotal] = useState(0);


  useEffect(() =>{
    document.title = `${capitalizeFirstLetter(props.category)} - News App`;
    props.setProgress(10);
    fetchData();
  }, [])

  const fetchData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;

    setLoader(true);
    props.setProgress(25);
    let data = await fetch(url);
    let parsedData = await data.json();

    props.setProgress(75);

    setTotal(parsedData.totalResults);
    setArr(parsedData.articles);
    setLoader(false);

    props.setProgress(100);
  }

  function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  // function getPrev(){
  //   setPage((prev) =>{
  //     return Math.max(prev-1, 1);
  //   })
  // }

  // function getNext(){
  //   setPage((prev) =>{
  //     return prev+1;
  //   })
  // }

  const fetchMore = async () => {   
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1) 
    let data = await fetch(url);
    let parsedData = await data.json()
    setArr((prev) =>{
      return prev.concat(parsedData.articles);
    })
  };

  return (
    <div className='my-2 text-center'>
      <h1 className='text-center' style={{ margin: '20px 0px' }}>NewsApp - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loader && <Spinner />}
      <InfiniteScroll
        dataLength={arr.length}
        next={fetchMore}
        hasMore={arr.length !== total}
        loader={<Spinner />}
      >


        <div className="row">
          {arr.map((element) => {
            return <div className="col-md-4">
              <NewsItems 
                key={element.url}
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                date={element.publishedAt}
                name={element.source.name}
              />
            </div>
          })}
        </div>
      </InfiniteScroll>

      {/* <div class="d-flex justify-content-between my-2">
        <button disabled={page <= 1} type="button" className="btn btn-dark" onClick={getPrev}>&larr;Previous</button>
        <button disabled={page >= Math.ceil(total / props.pageSize)} type="button" className="btn btn-dark" onClick={getNext}>Next&rarr;</button>

      </div> */}
    </div>

  )
}


