const menuItems = [
  {
    id: 1,
    name: "Classic Burger",
    category: "burger",
    price: 149,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "burger",
    price: 179,
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Margherita Pizza",
    category: "pizza",
    price: 249,
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Veggie Pizza",
    category: "pizza",
    price: 299,
    image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    name: "White Sauce Pasta",
    category: "pasta",
    price: 199,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    name: "Cold Coffee",
    category: "drink",
    price: 99,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80"
  }
];

let cart = [];

const menuContainer = document.getElementById("menuContainer");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const cartItems = document.getElementById("cartItems");
const totalPrice = document.getElementById("totalPrice");
const cartCount = document.getElementById("cartCount");
const clearCartBtn = document.getElementById("clearCartBtn");
const placeOrderBtn = document.getElementById("placeOrderBtn");
const orderMessage = document.getElementById("orderMessage");

function displayMenu(items) {
  menuContainer.innerHTML = "";

  if (items.length === 0) {
    menuContainer.innerHTML = "<p>No items found.</p>";
    return;
  }

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Category: ${item.category}</p>
      <p class="price">₹${item.price}</p>
      <button class="btn" onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuContainer.appendChild(card);
  });
}

function filterMenu() {
  const searchText = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText);
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  displayMenu(filteredItems);
}

function addToCart(id) {
  const item = menuItems.find(food => food.id === id);
  const existingItem = cart.find(cartItem => cartItem.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  orderMessage.textContent = "";
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  }

  let total = 0;
  let count = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    count += item.quantity;

    const row = document.createElement("div");
    row.className = "cart-item";
    row.innerHTML = `
      <span><strong>${item.name}</strong> - ₹${item.price} x ${item.quantity}</span>
      <div class="qty-controls">
        <button onclick="decreaseQuantity(${item.id})">-</button>
        <button onclick="increaseQuantity(${item.id})">+</button>
        <button class="remove" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItems.appendChild(row);
  });

  totalPrice.textContent = total;
  cartCount.textContent = count;
}

function increaseQuantity(id) {
  const item = cart.find(cartItem => cartItem.id === id);
  if (item) {
    item.quantity += 1;
  }
  updateCart();
}

function decreaseQuantity(id) {
  const item = cart.find(cartItem => cartItem.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
  } else {
    removeFromCart(id);
  }
  updateCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

clearCartBtn.addEventListener("click", () => {
  cart = [];
  orderMessage.textContent = "Cart cleared successfully.";
  updateCart();
});

placeOrderBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    orderMessage.textContent = "Please add at least one item before placing order.";
    orderMessage.style.color = "#d62828";
    return;
  }

  cart = [];
  updateCart();
  orderMessage.textContent = "Order placed successfully! Thank you.";
  orderMessage.style.color = "green";
});

searchInput.addEventListener("input", filterMenu);
categoryFilter.addEventListener("change", filterMenu);

// Contact form validation
document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const formMessage = document.getElementById("formMessage");

  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "All fields are required.";
    formMessage.style.color = "#d62828";
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    formMessage.textContent = "Please enter a valid email address.";
    formMessage.style.color = "#d62828";
    return;
  }

  formMessage.textContent = "Message sent successfully!";
  formMessage.style.color = "green";
  this.reset();
});

displayMenu(menuItems);
updateCart();
