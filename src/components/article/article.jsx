import React, { useState } from "react";
import trash from "../../asset/trash.png";
import moment from "moment";
import "./article.css";

export default function Article({ article, deleteArticle }) {
	const [trashCan, setTrashCan] = useState(false);

	moment.updateLocale("en", {
		calendar: {
			lastDay: "[Yesterday]",
			sameDay: "LT",
			lastWeek: "DD MMM",
			sameElse: "DD MMM",
		},
	});

	return (
		<div
			className="article"
			onMouseEnter={() => setTrashCan(true)}
			onMouseLeave={() => setTrashCan(false)}
		>
			<div className="main-data">
				<div className="article-title">
					<a href={article.url}>{article.title}</a>
				</div>
				<div className="article-author">- {article.author} - </div>
			</div>
			<div className="article-date">
				<div>{moment(article.creationDate).calendar()}</div>
				{trashCan ? (
					<div className="icon" onClick={() => deleteArticle(article.articleID)}>
						<img alt="trash" src={trash}></img>
					</div>
				) : (
					<div className="icon"></div>
				)}
			</div>
		</div>
	);
}
