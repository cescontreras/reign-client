import Axios from "axios";
import React, { useEffect, useState } from "react";
import Article from "../article/article";

import "./container.css";

export default function Container() {
	const [articles, setArticles] = useState([]);

	const getArticles = async () => {
		const { data } = await Axios.get("http://localhost:3001/articles");
		const articles = data.articles;
    const filtered = filterArticles(articles);    
		setArticles(filtered);
	};

  const addException = (id) => {
		const deleted = JSON.parse(localStorage.getItem("deleted"));
		if (!deleted) {
			let item = {[id]: id}
			localStorage.setItem("deleted", JSON.stringify(item));
		} else {
      deleted[id] = id
			localStorage.setItem("deleted", JSON.stringify(deleted));      
		}
	};

	const deleteArticle = async (id) => {
    addException(id)
		getArticles();
	};
  
  const filterArticles = (data) => {
		if (localStorage.getItem("deleted")) {
      let deleted = JSON.parse(localStorage.getItem("deleted"));
      				
			let filtered = data.filter((a) => !deleted[a.articleID]);
			
			return filtered;
		} else {
			return data;
		}
	};

	useEffect(() => {
		getArticles();
	}, []);

	return (
		<div className="container">
			{articles[0] &&
				articles.map((a, i) => (
					<Article key={a.articleID} article={a} deleteArticle={deleteArticle} />
				))}
		</div>
	);
}
