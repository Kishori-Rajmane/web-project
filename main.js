document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "T shirt", price: 100, category: "T shirt", rating: 5, availability: "in-stock", image: "pic 3.jpg" },
        { id: 2, name: "Jaket", price: 200, category: "Jaket", rating: 4, availability: "out-of-stock", image: "pic 4.jpg" },
        { id: 3, name: "Top", price: 150, category: "Top", rating: 3, availability: "in-stock", image: "pic 2.jpg" },
        { id: 4, name: "Men", price: 100, category: "Men", rating: 5, availability: "in-stock", image: "pic 5.jpg" },
        { id: 5, name: "Jaket", price: 200, category: "Jaket", rating: 4, availability: "out-of-stock", image: "pic 4.jpg" },
        { id: 6, name: "T shirt", price: 150, category: "T shirt", rating: 3, availability: "in-stock", image: "pic 2.jpg" },
        { id: 7, name: "Men", price: 100, category: "Men", rating: 5, availability: "in-stock", image: "pic 5.jpg" },
        { id: 8, name: "Top", price: 200, category: "Top", rating: 4, availability: "out-of-stock", image: "pic 2.jpg" },
        { id: 9, name: "T shirt", price: 150, category: "T shirt", rating: 3, availability: "in-stock", image: "pic 3.jpg" },
        
    ];
    const productContainer = document.getElementById("productContainer");
    const searchBar = document.getElementById("searchBar");
    const sortOptions = document.getElementById("sortOptions");
    const filterCategory = document.getElementById("filterCategory");
    const minPrice = document.getElementById("minPrice");
    const maxPrice = document.getElementById("maxPrice");
    const filterRating = document.getElementById("filterRating");
    const filterAvailability = document.getElementById("filterAvailability");
    const paginationContainer = document.getElementById("pagination");
    
    let currentPage = 1;
    const itemsPerPage = 6;
    
    function displayProducts(filteredProducts) {
        productContainer.innerHTML = "";
        const start = (currentPage - 1) * itemsPerPage;
        const paginatedProducts = filteredProducts.slice(start, start + itemsPerPage);
        paginatedProducts.forEach(product => {
            productContainer.innerHTML += `
              <div class="col-md-4 mb-4">
    <div class="card">
        <div class="image-container">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-buttons">
                <button class="btn btn-primary"><i class="fas fa-shopping-cart"></i></button>
                 <a href="git.html" class="btn btn-secondary">
        <i class="fas fa-eye"></i>
    </a>
            </div>
        </div>
        <div class="card-body text-center">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">$${product.price}</p>
            <p class="card-text">Rating: ${product.rating} ⭐</p>
            <p class="card-text">${product.availability}</p>
        </div>
    </div>
</div>
`;
        });
        updatePagination(filteredProducts.length);
        
    }
    
    function updatePagination(totalItems) {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.textContent = i;
            button.disabled = i === currentPage;
            button.addEventListener("click", () => {
                currentPage = i;
                filterAndSortProducts();
            });
            paginationContainer.appendChild(button);
        }
    }
    
    function filterAndSortProducts() {
        let filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchBar.value.toLowerCase()) &&
            (filterCategory.value === "all" || product.category === filterCategory.value) &&
            (filterRating.value === "all" || product.rating >= parseInt(filterRating.value)) &&
            (filterAvailability.value === "all" || product.availability === filterAvailability.value) &&
            (minPrice.value === "" || product.price >= parseInt(minPrice.value)) &&
            (maxPrice.value === "" || product.price <= parseInt(maxPrice.value))
        );
        if (sortOptions.value === "low-high") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(filteredProducts);
    }
    
    searchBar.addEventListener("input", filterAndSortProducts);
    sortOptions.addEventListener("change", filterAndSortProducts);
    filterCategory.addEventListener("change", filterAndSortProducts);
    minPrice.addEventListener("input", filterAndSortProducts);
    maxPrice.addEventListener("input", filterAndSortProducts);
    filterRating.addEventListener("change", filterAndSortProducts);
    filterAvailability.addEventListener("change", filterAndSortProducts);
    displayProducts(products);
});


