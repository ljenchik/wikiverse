import apiURL from "../api";
import dateFormat from "dateformat";
import { uptime } from "process";
import React, { useEffect, useState } from "react";

export default PageDetails = ({ page, setCurrentPage, setPages, pages }) => {
    const [article, setArticle] = useState();
    const [updatedPage, setUpdatedPage] = useState();
    const [isUpdatingArticle, setIsUpdatingArticle] = useState(false);
    console.log(isUpdatingArticle);

    async function fetchPage() {
        try {
            const response = await fetch(`${apiURL}/wiki/${page.slug}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setArticle(data);
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

    const handleDelete = async () => {
        setCurrentPage("");
        const response = await fetch(`${apiURL}/wiki/${page.slug}`, {
            method: "DELETE",
        });
        const data = await response.json();
        setPages(data);
    };

    const handleUpdate = async (article) => {
        //setCurrentPage("");
        // const response = await fetch(`${apiURL}/wiki/${page.slug}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(newPage),
        // });
        // const data = await response.json();
        // console.log(data);
        setIsUpdatingArticle(!isUpdatingArticle);
    };

    const handleUpdateFormChange = (event) => {};

    if (article && !isUpdatingArticle) {
        return (
            <div className="details-container">
                <ul>
                    <li>
                        <h3 style={{ color: "blueviolet" }}>{article.title}</h3>
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
                <div className="buttons-container">
                    <button
                        onClick={() => handleBackClick()}
                        className="back-button"
                    >
                        Back to Wiki List
                    </button>
                    <button
                        onClick={() => handleUpdate()}
                        className="update-button"
                    >
                        Update
                    </button>
                    <button
                        onClick={() => handleDelete()}
                        className="delete-button"
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    } else if (article && isUpdatingArticle) {
        return <div>Hello</div>;
    }
};
