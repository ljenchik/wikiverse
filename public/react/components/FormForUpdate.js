import React, { useState } from "react";
import apiURL from "../api";

export default FormForUpdate = ({ setPages, article, pages }) => {
    let tags = "";
    for (const tag of article.tags) {
        tags += " " + tag.name;
    }
    const [updatedPage, setUpdatedPage] = useState({
        title: article.title,
        content: article.content,
        name: article.author.name,
        email: article.author.email,
        tags: tags,
    });
    console.log("Updated values: ", updatedPage);
    console.log("Pages: ", pages);

    const handleFormChange = (event) => {
        const value = event.target.value;
        setUpdatedPage({ ...updatedPage, [event.target.name]: value });
    };

    const handleSubmit = async () => {
        const response = await fetch(`${apiURL}/wiki/:slug`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedPage),
        });
        // const data = await response.json();
        // console.log("Data: ", data);

        setPages([...pages, updatedPage]);
    };

    return (
        <>
            <form className="form-container" onChange={handleFormChange}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={updatedPage.title}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Content:
                    <input
                        type="text"
                        name="content"
                        value={updatedPage.content}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        name="name"
                        value={updatedPage.name}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={updatedPage.email}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Tags:
                    <input
                        type="text"
                        name="tags"
                        value={updatedPage.tags}
                        onChange={handleFormChange}
                    />
                </label>
            </form>
            <button
                onClick={handleSubmit}
                type="submit"
                className="submit-button"
            >
                Submit
            </button>
        </>
    );
};
