import React, { useState } from "react";

export default Page = ({ page, setCurrentPage }) => {
    return (
        <>
            <h3
                onClick={({ target: { innerText } }) =>
                    setCurrentPage(innerText)
                }
            >
                {page.title}
            </h3>
        </>
    );
};
