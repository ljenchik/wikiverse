import React from "react";

export default PagesList = ({ pages, setCurrentPage }) => {
    return (
        <>
            {pages.map((page, idx) => {
                return (
                    <>
                        <h3
                            key={idx}
                            onClick={({ target: { innerText } }) =>
                                setCurrentPage(innerText)
                            }
                        >
                            {page.title}
                        </h3>
                    </>
                );
            })}
        </>
    );
};
