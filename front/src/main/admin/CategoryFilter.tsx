import React from "react";
import Category from "./Category";
import CategoryPage from "./CategoryPage";
import {Redirect} from "react-router-dom";

export const CategoryFilter: React.FC = () => {

    const isAdmin = () => {
        return localStorage.getItem('role') === "ROLE_ADMIN" ;
    }

    return (
        <>
            {isAdmin() ?
                <CategoryPage/>
                :
                <Redirect to="/" />
            }
        </>
    )
}