import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../article/article';

import './container.css';

export default function Container(){

  const [articles, setArticles] = useState([])
  // const [deleted, setDeleted] = useState([])

  const getArticles = async () => {
    const {data} = await Axios.get('http://localhost:3001/articles')
    setArticles(data.articles)
  } 

  const deleteArticle = (id) => {      
    const deleted = JSON.parse(localStorage.getItem('deleted'))
    if(!deleted){
      let item = [].concat(id)        
      localStorage.setItem('deleted', JSON.stringify(item))    
    }else {
      let item = [].concat(deleted);
      item.push(id)
      localStorage.setItem('deleted', JSON.stringify(item))
    }  
  };

  const filterArticles = () => {    
    if(!localStorage.getItem('deleted')) return; 
    
    let deleted = [].concat(JSON.parse(localStorage.getItem('deleted')));
      
    deleted.forEach(el => {                   
      setArticles(articles.filter((a) => a.articleID !== el.toString()))
    });
  };

  useEffect(() => {
    getArticles();
    filterArticles();
  }, [])

  return (
    <div className='container'>
      {articles[0] && articles.map((a, i) => 
        <Article 
          key={a.articleID} 
          article={a} 
          deleteArticle={deleteArticle}
          />
      )}
    </div>
  )
}