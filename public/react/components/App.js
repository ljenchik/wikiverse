import React, { useState, useEffect } from "react";
import PagesList from "./PagesList";
import apiURL from "../api";
import PageDetails from "./PageDetails";
import Form from "./Form";

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

    return (
        <main>
            <h1>WikiVerse</h1>
            <h2>An interesting 📚</h2>
            {currentPage ? (
                <PageDetails
                    page={pages.find(({ title }) => title === currentPage)}
                    setCurrentPage={setCurrentPage}
                    setPages={setPages}
                />
            ) : isAddingArticle ? (
                <Form
                    newPage={newPage}
                    setNewPage={setNewPage}
                    setIsAddingArticle={setIsAddingArticle}
                    setPages={setPages}
                />
            ) : (
                <>
                    <PagesList pages={pages} setCurrentPage={setCurrentPage} />
                    <button
                        className="create-button"
                        onClick={handleCreatePageClick}
                        setIsAddingArticle={setIsAddingArticle}
                    >
                        Create page
                    </button>
                </>
            )}
        </main>
    );
};
