import { cart, addToCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = '';

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(product.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

function updateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// ✅ Login check before adding to cart
document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn) {
        alert('Please login to add items to cart.');
        window.location.href = 'form.html'; 
        return;
      }

      const productId = button.dataset.productId;
      addToCart(productId);
      updateCartQuantity();
    });
  });



  // ✅ Handle Login/Logout header dynamically
document.addEventListener('DOMContentLoaded', () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const authText = document.getElementById('auth-text');
  const authLink = document.getElementById('auth-link');

  if (isLoggedIn) {
    authText.textContent = 'Logout';
    authLink.href = '#'; // prevent default nav

    authLink.addEventListener('click', async (event) => {
      event.preventDefault();

      const refreshToken = localStorage.getItem('refresh');

      if (!refreshToken) {
        alert('Session expired or token missing.');
        handleFrontendLogout();
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/logout/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('access')}`
          },
          body: JSON.stringify({ refresh: refreshToken })
        });

        if (response.ok) {
          alert('Logout successful.');
        } else {
          const data = await response.json();
          alert(`Logout failed: ${data.detail || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Logout error:', error);
        alert('Network error during logout.');
      }

      handleFrontendLogout();
    });

  } else {
    authText.textContent = 'Login';
    authLink.href = 'form.html';
  }
});

// ✅ Clear tokens and redirect to login
function handleFrontendLogout() {
  localStorage.removeItem('access');
  localStorage.removeItem('refresh');
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'form.html'; // redirect to login page
}




// ✅ Restrict access to Add New Items link in the header
document.addEventListener('DOMContentLoaded', () => {
  const addNewLink = document.querySelector('a[href="Inputdata.html"]');

  if (addNewLink) {
    addNewLink.addEventListener('click', (event) => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn) {
        event.preventDefault();
        alert('Please login to access Add New Items.');
        window.location.href = 'form.html'; // Redirect to login
      }
    });
  }
});

let item = 0;
