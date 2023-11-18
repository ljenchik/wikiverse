import React from "react";

export default PagesList = ({ pages, setCurrentPage }) => {
    return (
        <div className="pages-container">
            {pages.map((page, index) => {
                return (
                    <button
                        className="page"
                        key={index}
                        onClick={({ target: { innerText } }) =>
                            setCurrentPage(innerText)
                        }
                    >
                        {page.title}
                    </button>
                );
            })}
        </div>
    );
};
