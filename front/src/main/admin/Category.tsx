import React from "react";
import {KINDER_BACK_URL} from "../../common/util";

function Category(props: { text?: string, id: number, onSubmit: (f: void) => void }) {

    const deleteCategory = (id: number) => {
        fetch(`${KINDER_BACK_URL}/category/` + id, {
            method: "DELETE",
        }).then(r => {props.onSubmit()})
    }

    return (
        <p>{props.text}
        <button onClick={() => deleteCategory(props.id)}>
            USUŃ
        </button>
        </p>
    );
}

export default Category;