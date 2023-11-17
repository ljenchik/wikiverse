import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, setPages }) => {
    return (
        <>
            {pages.map((page, idx) => {
                return <Page page={page} key={idx} setPages={setPages} />;
            })}
        </>
    );
};
