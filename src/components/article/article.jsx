import React from "react";
import trash from "../../asset/trash.png";
import "./article.css";

export default function Article({ article, deleteArticle }) {
	
	return (
		<div className="article">
			<div className="main-data">
				<div className="article-title">
					<a href={article.url}>{article.title}</a>					
				</div>
				<div className="article-author">- {article.author} - </div>
			</div>
			<div className="article-date">
				<div>{article.creationDate}</div>
				<div className="icon" onClick={() => deleteArticle(article.articleID)}>
					<img alt="trash" src={trash}></img>
				</div>
			</div>
		</div>
	);
}
