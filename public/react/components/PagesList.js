import React from "react";

export default PagesList = ({ pages, setCurrentPage }) => {
    return (
        <div>
            {pages.map((page, index) => {
                return (
                    <div
                        className="page"
                        key={index}
                        onClick={({ target: { innerText } }) =>
                            setCurrentPage(innerText)
                        }
                    >
                        {page.title}
                    </div>
                );
            })}
        </div>
    );
};
