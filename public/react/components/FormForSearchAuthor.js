import React, { useEffect, useState } from "react";
import apiURL from "../api";

export default FormForSearchAuthor = ({ setUserName, userName }) => {
    const [user, setUser] = useState();
    const [isFoundUser, setIsFoundUser] = useState(false);
    const handleFormChange = (event) => {
        setUserName(event.target.value);
    };

    async function fetchUser() {
        try {
            const response = await fetch(`${apiURL}/users/name/${userName}`);
            const user = await response.json();
            setIsFoundUser(true);
            setUser(user);
            console.log(user);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <div className="search-container">
                <form className="form-container onChange={handleFormChange}">
                    <label>
                        Find articles by author:
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter name"
                            onChange={handleFormChange}
                        />
                    </label>
                </form>
                <button
                    type="submit"
                    className="search-button"
                    onClick={fetchUser}
                >
                    Search
                </button>
            </div>
            {user && user.length > 0 ? (
                <div className="author-pages-container">
                    <h3>Articles by {userName}</h3>
                    {user[0].pages.map((page, index) => (
                        <p key={index}>{page.title}</p>
                    ))}
                </div>
            ) : (
                ""
            )}
        </>
    );
};
