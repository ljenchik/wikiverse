import React, { useState, useEffect } from "react";
import PagesList from "./PagesList";
import apiURL from "../api";
import PageDetails from "./PageDetails";

export const App = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState();
    const [isAddingArticle, setIsAddingArticle] = useState(false);
    const [newPage, setNewPage] = useState({
        title: "",
        content: "",
        name: "",
        email: "",
        tags: "",
    });

    async function fetchPages() {
        try {
            const response = await fetch(`${apiURL}/wiki`);
            const pagesData = await response.json();
            setPages(pagesData);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }

    useEffect(() => {
        fetchPages();
    }, []);

    const handleCreatePageClick = () => {
        setIsAddingArticle(true);
    };

    const handleSubmit = async () => {
        setIsAddingArticle(false);
        console.log(newPage);
        const response = await fetch(`${apiURL}/wiki`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPage),
        });
        const data = await response.json();
        console.log(data);
    };

    const handleFormChange = (event) => {
        const value = event.target.value;
        setNewPage({ ...newPage, [event.target.name]: value });
        console.log(newPage);
    };

    return (
        <main>
            <h1>WikiVerse</h1>
            <h2>An interesting 📚</h2>
            {currentPage ? (
                <PageDetails
                    page={pages.find(({ title }) => title === currentPage)}
                    setCurrentPage={setCurrentPage}
                />
            ) : isAddingArticle ? (
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
            ) : (
                <PagesList pages={pages} setCurrentPage={setCurrentPage} />
            )}
            {isAddingArticle ? (
                <button onClick={handleSubmit} type="submit">
                    Submit
                </button>
            ) : (
                <button onClick={handleCreatePageClick}>Create page</button>
            )}
        </main>
    );
};
