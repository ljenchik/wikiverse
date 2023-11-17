import React from "react";
import apiURL from "../api";

export default Form = ({
    newPage,
    setNewPage,
    setIsAddingArticle,
    setPages,
}) => {
    const handleSubmit = async () => {
        setIsAddingArticle(false);
        const response = await fetch(`${apiURL}/wiki`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPage),
        });
        setPages([...pages, newPage]);
    };

    const handleFormChange = (event) => {
        const value = event.target.value;
        setNewPage({ ...newPage, [event.target.name]: value });
        console.log(newPage);
    };
    return (
        <>
            <form className="form-container" onChange={handleFormChange}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={newPage.title}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Content:
                    <input
                        type="text"
                        name="content"
                        value={newPage.content}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Author:
                    <input
                        type="text"
                        name="name"
                        value={newPage.name}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={newPage.email}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Tags:
                    <input
                        type="text"
                        name="tags"
                        value={newPage.tags}
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
