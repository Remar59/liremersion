import React, { useEffect, useState } from "react";

function Category() {
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const categoryName = window.location.pathname.split("/").pop();
        console.log("Category Name:", categoryName);
        
        const fetchCategoryDetails = async () => {
            try {
                // Remplacer cette logique par votre propre logique pour récupérer les détails de la catégorie
                const response = await fetch(`http://localhost:5500/categories/${categoryName}`);
                const data = await response.json();
                // Mettre à jour l'état avec le nom de la catégorie
                setCategoryName(data.name);
            } catch (error) {
                console.error("Error fetching category details:", error);
            }
        };

        fetchCategoryDetails();
    }, []);

    return (
        <div>
            <h1>Détails de la catégorie : {categoryName}</h1>
        </div>
    );
}

export default Category;
