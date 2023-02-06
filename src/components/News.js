import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor() {
        super()
        this.state = {
            articles : [],
            loading : true,
            pageNo : 1,
            pageSize : 20,
            totalResults : 0,
            pages : 0
        }
    }
    
    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c391294e204db495548db563d3a964&page=${this.state.pageNo}`
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles : parsedData.articles,
            totalResults : parsedData.totalResults,
            pages : Math.ceil(parsedData.totalResults / this.state.pageSize)
        })
    }

    handlePrevious = async () => {
        if(this.state.pageNo > 1) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c391294e204db495548db563d3a964&page=${this.state.pageNo-1}`
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                pageNo : this.state.pageNo - 1,
                articles : parsedData.articles,
                totalResults : parsedData.totalResults,
                pages : Math.ceil(parsedData.totalResults / this.state.pageSize)
            })
        }
    }

    handleNext = async () => {
        if(this.state.pageNo < this.state.pages) {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=19c391294e204db495548db563d3a964&page=${this.state.pageNo+1}`
            let data = await fetch(url);
            let parsedData = await data.json()
            this.setState({
                pageNo : this.state.pageNo+1,
                articles : parsedData.articles,
                totalResults : parsedData.totalResults,
                pages : Math.ceil(parsedData.totalResults / this.state.pageSize)
            })
        }
    }

    render() {
    return (
      <div className='container my-3'>
          <h2>News Monkey - Top Headlines</h2>
          <div className="row">
            {this.state.articles.map((element) => {
                return <div className="col-md-4 my-2" key={element.url}>
                   <NewsItem title={element.title ? element.title.slice(0,45) : ''} description={element.description ? element.description.slice(0, 88) : ''}
                     imageUrl={element.urlToImage ? element.urlToImage : 'https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/2/2023_2$largeimg_1893561888.JPG'}
                     newsUrl={element.url}/>
                </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
              <button disabled={this.state.pageNo <= 1} type='button' className='btn btn-dark' onClick={this.handlePrevious}>Previous</button>
              <button disabled={this.state.pageNo >= this.state.pages} type='button' className='btn btn-dark' onClick={this.handleNext}>Next</button>
          </div>
      </div>
    )
  }
}

export default News