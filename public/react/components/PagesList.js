import React from "react";
import Page from "./Page";

export default PagesList = ({ pages, setCurrentPage }) => {
    return (
        <>
            {pages.map((page, idx) => {
                return (
                    <Page
                        page={page}
                        key={idx}
                        setCurrentPage={setCurrentPage}
                    />
                );
            })}
        </>
    );
};
