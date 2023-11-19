import React, { useEffect, useState } from "react";
import apiURL from "../api";

export default FormForSearchAuthor = ({
    setUserName,
    userName,
    foundUser,
    setFoundUser,
}) => {
    const handleFormChange = (event) => {
        setUserName(event.target.value);
    };

    async function fetchUser() {
        try {
            const response = await fetch(`${apiURL}/users/name/${userName}`);
            const user = await response.json();
            setFoundUser(user);
        } catch (err) {
            console.log("Oh no an error! ", err);
        }
    }

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
        </>
    );
};
