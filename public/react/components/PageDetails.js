import apiURL from "../api";
import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";

export default PageDetails = ({ page, setCurrentPage }) => {
    console.log(page);
    const [article, setArticle] = useState();

    async function fetchPage() {
        try {
            const response = await fetch(`${apiURL}/wiki/${page.slug}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setArticle(data);
            console.log(data);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }

    useEffect(() => {
        fetchPage();
    }, []);

    const handleBackClick = () => {
        setCurrentPage("");
    };

    if (article) {
        return (
            <>
                <div>
                    <ul>
                        <li>
                            <h3>{article.title}</h3>
                        </li>
                        <li>
                            <strong>Author:</strong>
                            {article.author.name}
                        </li>
                        <li>
                            <strong>Published:</strong>
                            {dateFormat(article.createdAt, "dd/mm/yyyy")}
                        </li>
                        <li>{article.content}</li>
                        <li>
                            <strong>Tags:</strong>
                            {article.tags.map((tag, index) => (
                                <p key={index}>{tag.name}</p>
                            ))}
                        </li>
                    </ul>
                    <button onClick={() => handleBackClick()}>
                        Back to Wiki List
                    </button>
                </div>
            </>
        );
    }
};
