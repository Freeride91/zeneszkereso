import React from "react";
import Posts from "./Posts";
import Filter from "./Filter";
import CustomAlert from "./layout/CustomAlert";

export default function Landing({ history }) {
    return (
        <>
            <h2 className="main--title py-2 border-bottom text-center">Hirdetések</h2>

            <CustomAlert />

            <Filter />

            <Posts history={history} />
        </>
    );
}
