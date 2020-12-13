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
			let item = [].concat(id);
			localStorage.setItem("deleted", JSON.stringify(item));
		} else {
			let item = [].concat(deleted);
			item.push(id);
			localStorage.setItem("deleted", JSON.stringify(item));
		}
  };
  
  // const addExceptionObj = (id) => {
	// 	const deleted = JSON.parse(localStorage.getItem("deleted"));
	// 	if (!deleted) {
	// 		let item = {id}
	// 		localStorage.setItem("deleted", JSON.stringify(item));
	// 	} else {
	// 		let item = [].concat(deleted);
	// 		item.push(id);
	// 		localStorage.setItem("deleted", JSON.stringify(item));
	// 	}
	// };

	const deleteArticle = async (id) => {
    addException(id);
    // addExceptionObj(id)
		getArticles();
	};

	const filterArticles = (data) => {
		if (localStorage.getItem("deleted")) {
			let deleted = [].concat(JSON.parse(localStorage.getItem("deleted")));

			let filtered = data;
			deleted.forEach((el) => {
				filtered = filtered.filter((a) => a.articleID.toString() !== el.toString());
			});
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
