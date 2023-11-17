import React, { useState, useEffect } from "react";
import PagesList from "./PagesList";
import apiURL from "../api";
import PageDetails from "./PageDetails";

export const App = () => {
    const [pages, setPages] = useState([]);
    const [currentPage, setCurrentPage] = useState();

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

    return (
        <main>
            <h1>WikiVerse</h1>
            <h2>An interesting 📚</h2>
            {currentPage ? (
                <PageDetails
                    page={pages.find(({ title }) => title === currentPage)}
                    setCurrentPage={setCurrentPage}
                />
            ) : (
                <PagesList pages={pages} setCurrentPage={setCurrentPage} />
            )}
        </main>
    );
};
