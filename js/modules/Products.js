// js/modules/Products.js

import { ApiService } from '../services/Api.js';
import { CartModule } from './Cart.js';
import { renderProductCard } from '../components/ProductCard.js';

// ۱. دریافت لیست محصولات
async function fetchAllProducts() {
    try {
        // فراخوانی API برای دریافت لیست محصولات
        const products = await ApiService.get('products');
        return products;
    } catch (error) {
        console.error('خطا در دریافت لیست محصولات:', error);
        return [];
    }
}

// ۲. نمایش لیست محصولات در DOM
async function renderProductList(containerElement) {
    const products = await fetchAllProducts();
    containerElement.innerHTML = ''; // پاک کردن محتوای قبلی
    
    const productsGrid = document.createElement('div');
    productsGrid.className = 'products-grid'; // CSS Grid یا Flexbox برای چینش کارت‌ها
    
    products.forEach(product => {
        // استفاده از کامپوننت برای ساخت المان HTML
        const cardElement = renderProductCard(product); 
        
        // افزودن شنونده رویداد (Listener) برای دکمه "افزودن به سبد خرید"
        const addButton = cardElement.querySelector('.btn-add-to-cart');
        if (addButton) {
            addButton.addEventListener('click', () => {
                CartModule.addToCart(product.id, 1);
            });
        }
        
        productsGrid.appendChild(cardElement);
    });
    
    containerElement.appendChild(productsGrid);
}

// ۳. دریافت جزئیات یک محصول
async function fetchProductDetails(productId) {
    try {
        const product = await ApiService.get(`products/${productId}`);
        return product;
    } catch (error) {
        console.error(`خطا در دریافت جزئیات محصول ${productId}:`, error);
        return null;
    }
}

export const ProductsModule = {
    fetchAllProducts,
    fetchProductDetails,
    renderProductList
    // ... renderProductDetails, searchProducts
};