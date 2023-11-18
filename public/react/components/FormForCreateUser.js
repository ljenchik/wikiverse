import React from "react";
import apiURL from "../api";

export default Form = ({
    newUser,
    setNewUser,
    setIsAddingUser,
    setUsers,
    users,
}) => {
    const handleSubmit = async () => {
        setIsAddingUser(false);
        const response = await fetch(`${apiURL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });
        setUsers([...users, newUser]);
    };

    const handleFormChange = (event) => {
        const value = event.target.value;
        setNewUser({ ...newUser, [event.target.name]: value });
        console.log(newUser);
    };
    return (
        <>
            <form className="form-container" onChange={handleFormChange}>
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={newUser.name}
                        onChange={handleFormChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="text"
                        name="email"
                        value={newUser.email}
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
