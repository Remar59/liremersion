import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/category.scss";

function Category() {
    const { categoryId } = useParams();
    const [categoryName, setCategoryName] = useState("");
    console.log("Category ID:", categoryId);

    useEffect(() => {
        const fetchCategoryDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5500/categories/${categoryId}`);
                const data = await response.json();
                setCategoryName(data.name);
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };

        fetchCategoryDetails();
    }, [categoryId]);

    return (
        <div className="categoryContainer">
            <h1>Catégorie {categoryName}</h1>
        </div>
    );
}

export default Category;
