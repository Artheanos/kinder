import React from "react";
import Category from "./Category";
import CategoryInput from "./CategoryInput";
import {KINDER_BACK_URL} from "../../common/util";

type Category = {
    id: number
    title: string,
    description: string
}

type CategoryPageState = {
    categories: Array<Category>,
}

class CategoryPage extends React.Component<any, CategoryPageState> {

    constructor(props: never) {
        super(props);
        this.state = {
            categories: []
        }
        this.fetchCategories = this.fetchCategories.bind(this)
    }

    fetchCategories() {
        fetch(`${KINDER_BACK_URL}/category/all`).then(response => {
            if (response.ok) {
                response.text().then(value => {
                    let cat = JSON.parse(value)
                    this.setState({categories: cat})
                })
            }
        })
    }

    componentDidMount() {
        this.fetchCategories()
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.categories.map((cat: Category, k: any) => {
                        return <Category onSubmit={this.fetchCategories} id={cat.id} text={cat.title} key={k}/>
                    })}
                </div>
                <CategoryInput onSubmit={this.fetchCategories}/>
            </div>
        )
    }
}

export default CategoryPage