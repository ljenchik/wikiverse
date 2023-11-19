import React from "react";

export default ListOfArticlesByUser = ({ foundUser }) => {
    console.log(foundUser);
    return (
        <div>
            {foundUser && foundUser[0].pages.length > 0 ? (
                <div className="author-pages-container">
                    <h3>Articles by {foundUser.name}</h3>
                    {foundUser[0].pages.map((page, index) => (
                        <p key={index}>{page.title}</p>
                    ))}
                </div>
            ) : foundUser ? (
                <h3>There are no articles by {foundUser[0].name}</h3>
            ) : (
                <h3>User is not found</h3>
            )}
        </div>
    );
};
