import React, { useState, useEffect } from "react";
import PagesList from "./PagesList";
import apiURL from "../api";
import PageDetails from "./PageDetails";
import Form from "./Form";
import FormForCreateUser from "./FormForCreateUser";
import FormForSearchAuthor from "./FormForSearchAuthor";
import ListOfArticlesByAuthor from "./ListOfArticlesByAuthor";

export const App = () => {
    const [pages, setPages] = useState([]);
    const [users, setUsers] = useState([]);
    const [userName, setUserName] = useState();
    const [currentPage, setCurrentPage] = useState();

    const [isAddingArticle, setIsAddingArticle] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [foundUser, setFoundUser] = useState();

    const [newPage, setNewPage] = useState({
        title: "",
        content: "",
        name: "",
        email: "",
        tags: "",
    });

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
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

    async function fetchUsers() {
        try {
            const response = await fetch(`${apiURL}/users`);
            const usersData = await response.json();
            setUsers(usersData);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }
    useEffect(() => {
        fetchPages();
        fetchUsers();
    }, []);

    const handleCreatePageClick = () => {
        setIsAddingArticle(true);
    };

    const handleCreateUserClick = () => {
        setIsAddingUser(true);
    };

    if (pages) {
        return (
            <main>
                <h1>WikiVerse</h1>
                <h2>An interesting 📚</h2>
                {currentPage ? (
                    <PageDetails
                        page={pages.find(({ title }) => title === currentPage)}
                        setCurrentPage={setCurrentPage}
                        setPages={setPages}
                        pages={pages}
                    />
                ) : isAddingArticle ? (
                    <Form
                        newPage={newPage}
                        setNewPage={setNewPage}
                        setIsAddingArticle={setIsAddingArticle}
                        setPages={setPages}
                        pages={pages}
                    />
                ) : isAddingUser ? (
                    <FormForCreateUser
                        newUser={newUser}
                        setNewUser={setNewUser}
                        setIsAddingUser={setIsAddingUser}
                        setUsers={setUsers}
                        users={users}
                    />
                ) : foundUser ? (
                    <ListOfArticlesByAuthor foundUser={foundUser} />
                ) : (
                    <>
                        <PagesList
                            pages={pages}
                            setCurrentPage={setCurrentPage}
                        />
                        <div className="buttons-container">
                            <button
                                className="create-button"
                                onClick={handleCreatePageClick}
                                setIsAddingArticle={setIsAddingArticle}
                            >
                                Create page
                            </button>
                            <button
                                className="create-button"
                                onClick={handleCreateUserClick}
                                setIsAddingArticle={setIsAddingArticle}
                                setIsAddingUser={setIsAddingUser}
                            >
                                Register user
                            </button>
                        </div>
                        <FormForSearchAuthor
                            setUserName={setUserName}
                            userName={userName}
                            setFoundUser={setFoundUser}
                        />
                    </>
                )}
            </main>
        );
    }
};
