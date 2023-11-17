import React, { useState, useEffect } from "react";
import apiURL from "../api";
import dateFormat from "dateformat";

export const Page = ({ page, setPages }) => {
    const [article, setArticle] = useState();

    async function fetchPage() {
        try {
            const response = await fetch(`${apiURL}/wiki/${page.slug}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setArticle(data);
            //setPages([]);
            console.log(data);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }

    console.log("article: ", article);

    return (
        <>
            <h3 onClick={() => fetchPage()}>{page.title}</h3>
            {article ? (
                <>
                    <h3>{article.title}</h3>
                    <p>
                        <strong>Author:</strong>
                        {article.author.name}
                    </p>
                    <p>
                        <strong>Published:</strong>
                        {dateFormat(article.createdAt, "dd/mm/yyyy")}
                    </p>
                    <p>{article.content}</p>
                    <p>
                        <strong>Tags:</strong>
                        {article.tags.map((tag, index) => (
                            <p key={index}>{tag.name}</p>
                        ))}
                    </p>
                </>
            ) : (
                ""
            )}
        </>
    );
};
