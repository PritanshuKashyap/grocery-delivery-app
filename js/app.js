/**
 * FreshMart Express - Online Grocery Delivery System Application Logic
 */

// Global State
let products = [];
let cart = [];
let appliedCoupon = null;
let currentModalProductId = null;

// Filter State
const filterState = {
  category: 'all',
  searchQuery: '',
  diet: 'all',
  maxPrice: 500,
  selectedBrands: []
};

// Initial Mock Product Dataset
const initialProducts = [
  // Fruits & Vegetables
  {
    id: 101,
    name: "Organic Bananas (1 Dozen)",
    category: "fruits-veg",
    categoryLabel: "Fruits & Vegetables",
    price: 60,
    originalPrice: 75,
    rating: 4.8,
    reviews: 124,
    isVeg: true,
    brand: "FreshFarm",
    badge: "Bestseller",
    badgeColor: "bg-success",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=600&q=80",
    description: "Farm-fresh, naturally ripened organic bananas rich in potassium and nutrients. Sourced directly from local orchards."
  },
  {
    id: 102,
    name: "Crisp Royal Gala Apples (1kg)",
    category: "fruits-veg",
    categoryLabel: "Fruits & Vegetables",
    price: 180,
    originalPrice: 220,
    rating: 4.9,
    reviews: 98,
    isVeg: true,
    brand: "Nature's Best",
    badge: "18% OFF",
    badgeColor: "bg-danger",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80",
    description: "Juicy, sweet, and crunchy Gala apples imported from premium orchards. Packed with antioxidants."
  },
  {
    id: 103,
    name: "Fresh Hass Avocados (Pack of 2)",
    category: "fruits-veg",
    categoryLabel: "Fruits & Vegetables",
    price: 240,
    originalPrice: 280,
    rating: 4.7,
    reviews: 65,
    isVeg: true,
    brand: "GreenChoice",
    badge: "Organic",
    badgeColor: "bg-primary-custom",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    description: "Creamy, rich Hass avocados perfect for guacamole, salads, or toast. Hand-picked for perfect ripeness."
  },
  {
    id: 104,
    name: "Organic Baby Spinach (250g)",
    category: "fruits-veg",
    categoryLabel: "Fruits & Vegetables",
    price: 45,
    originalPrice: 55,
    rating: 4.6,
    reviews: 82,
    isVeg: true,
    brand: "FreshFarm",
    badge: "Fresh Today",
    badgeColor: "bg-info",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80",
    description: "Pre-washed, tender organic baby spinach leaves. Perfect for nutrient-dense green smoothies and fresh salads."
  },
  {
    id: 105,
    name: "Farm Vine Tomatoes (1kg)",
    category: "fruits-veg",
    categoryLabel: "Fruits & Vegetables",
    price: 50,
    originalPrice: 65,
    rating: 4.5,
    reviews: 140,
    isVeg: true,
    brand: "Nature's Best",
    badge: "Essential",
    badgeColor: "bg-secondary",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&w=600&q=80",
    description: "Plump, red vine-ripened tomatoes bursting with flavor for sauces, curries, and salads."
  },

  // Dairy Products
  {
    id: 201,
    name: "Farm Fresh Whole Milk (1L)",
    category: "dairy",
    categoryLabel: "Dairy Products",
    price: 68,
    originalPrice: 75,
    rating: 4.9,
    reviews: 310,
    isVeg: true,
    brand: "DairyPure",
    badge: "Daily Fresh",
    badgeColor: "bg-success",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=600&q=80",
    description: "Pasteurized, homogenized whole cow milk rich in calcium and vitamin D. Delivered fresh every morning."
  },
  {
    id: 202,
    name: "Greek Yogurt Vanilla Honey (400g)",
    category: "dairy",
    categoryLabel: "Dairy Products",
    price: 145,
    originalPrice: 170,
    rating: 4.8,
    reviews: 185,
    isVeg: true,
    brand: "Organic Valley",
    badge: "High Protein",
    badgeColor: "bg-warning text-dark",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=600&q=80",
    description: "Thick, creamy probiotic Greek yogurt blended with real Madagascar vanilla and wild honey."
  },
  {
    id: 203,
    name: "Aged Sharp Cheddar Block (200g)",
    category: "dairy",
    categoryLabel: "Dairy Products",
    price: 290,
    originalPrice: 340,
    rating: 4.7,
    reviews: 74,
    isVeg: true,
    brand: "DairyPure",
    badge: "Artisanal",
    badgeColor: "bg-dark",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=600&q=80",
    description: "Aged 12 months for a bold, savory flavor profile. Great for cheese boards, gourmet burgers, and cooking."
  },
  {
    id: 204,
    name: "Organic Salted Butter (250g)",
    category: "dairy",
    categoryLabel: "Dairy Products",
    price: 130,
    originalPrice: 150,
    rating: 4.9,
    reviews: 210,
    isVeg: true,
    brand: "Organic Valley",
    badge: "Grass-Fed",
    badgeColor: "bg-primary-custom",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    description: "Golden butter churned from pure grass-fed cream with a pinch of natural sea salt."
  },

  // Snacks
  {
    id: 301,
    name: "Crunchy Roasted Almonds (250g)",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 320,
    originalPrice: 380,
    rating: 4.9,
    reviews: 142,
    isVeg: true,
    brand: "Nature's Best",
    badge: "Superfood",
    badgeColor: "bg-warning text-dark",
    image: "https://images.unsplash.com/photo-1508061252226-f87cf51c6e4e?auto=format&fit=crop&w=600&q=80",
    description: "Lightly salted, slow-roasted California almonds. High in healthy fats, protein, and dietary fiber."
  },
  {
    id: 302,
    name: "Multi-Grain Oat Biscuits (300g)",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 85,
    originalPrice: 100,
    rating: 4.4,
    reviews: 95,
    isVeg: true,
    brand: "Everyday Essentials",
    badge: "Zero Trans Fat",
    badgeColor: "bg-info",
    image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80",
    description: "Crispy cookies baked with whole oats, ragi, and honey. Ideal healthy companion for evening tea."
  },
  {
    id: 303,
    name: "Sea Salt Kettle Potato Chips (150g)",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 70,
    originalPrice: 85,
    rating: 4.6,
    reviews: 204,
    isVeg: true,
    brand: "Everyday Essentials",
    badge: "Hot Deal",
    badgeColor: "bg-danger",
    image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80",
    description: "Thick-cut kettle cooked potato chips seasoned with fine Himalayan pink sea salt."
  },
  {
    id: 304,
    name: "Smoked Chicken Jerky Strips (100g)",
    category: "snacks",
    categoryLabel: "Snacks",
    price: 250,
    originalPrice: 300,
    rating: 4.5,
    reviews: 48,
    isVeg: false,
    brand: "Nature's Best",
    badge: "Non-Veg Snack",
    badgeColor: "bg-danger",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    description: "High-protein lean chicken breast jerky strips hickory smoked with natural spices."
  },

  // Beverages
  {
    id: 401,
    name: "100% Cold-Pressed Orange Juice (1L)",
    category: "beverages",
    categoryLabel: "Beverages",
    price: 160,
    originalPrice: 190,
    rating: 4.8,
    reviews: 178,
    isVeg: true,
    brand: "GreenChoice",
    badge: "No Added Sugar",
    badgeColor: "bg-success",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80",
    description: "Pure pressed Valencia oranges with pulp. Never concentrated, zero artificial preservatives."
  },
  {
    id: 402,
    name: "Sparkling Lemon Mint Mocktail (330ml)",
    category: "beverages",
    categoryLabel: "Beverages",
    price: 65,
    originalPrice: 80,
    rating: 4.7,
    reviews: 112,
    isVeg: true,
    brand: "GreenChoice",
    badge: "Refreshing",
    badgeColor: "bg-primary-custom",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=600&q=80",
    description: "Zesty lemon soda infusing fresh garden mint leaves and natural mineral water sparkles."
  },
  {
    id: 403,
    name: "Organic Japanese Match Green Tea (100g)",
    category: "beverages",
    categoryLabel: "Beverages",
    price: 490,
    originalPrice: 580,
    rating: 4.9,
    reviews: 89,
    isVeg: true,
    brand: "Organic Valley",
    badge: "Premium Grade",
    badgeColor: "bg-dark",
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80",
    description: "Ceremonial grade shade-grown green tea powder loaded with L-theanine and antioxidants."
  },

  // Household Items
  {
    id: 501,
    name: "Eco Dishwashing Liquid Lemon (750ml)",
    category: "household",
    categoryLabel: "Household Items",
    price: 135,
    originalPrice: 160,
    rating: 4.7,
    reviews: 160,
    isVeg: true,
    brand: "Everyday Essentials",
    badge: "Plant-Based",
    badgeColor: "bg-success",
    image: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80",
    description: "Tough on grease, gentle on skin. Plant-derived formulation with fresh lemon citrus essence."
  },
  {
    id: 502,
    name: "Bamboo Fibre Paper Towel Rolls (Pack of 4)",
    category: "household",
    categoryLabel: "Household Items",
    price: 210,
    originalPrice: 250,
    rating: 4.8,
    reviews: 92,
    isVeg: true,
    brand: "GreenChoice",
    badge: "Eco Friendly",
    badgeColor: "bg-primary-custom",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
    description: "Super absorbent 2-ply unbleached bamboo towels. 100% biodegradable and tree-free."
  },
  {
    id: 503,
    name: "Lavender Fresh Laundry Liquid (1.5L)",
    category: "household",
    categoryLabel: "Household Items",
    price: 340,
    originalPrice: 400,
    rating: 4.6,
    reviews: 130,
    isVeg: true,
    brand: "Everyday Essentials",
    badge: "Deep Clean",
    badgeColor: "bg-info",
    image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&w=600&q=80",
    description: "Concentrated fabric cleaning solution with long-lasting French lavender aroma."
  }
];

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  products = [...initialProducts];
  initBrandsFilter();
  renderProducts();
  renderCart();
  setupEventListeners();
});

// Extract unique brands and build checkbox list
function initBrandsFilter() {
  const brandsSet = new Set(products.map(p => p.brand));
  const brandContainer = document.getElementById("brandFilterContainer");
  if (!brandContainer) return;

  brandContainer.innerHTML = Array.from(brandsSet).map(brand => `
    <div class="form-check mb-2">
      <input class="form-check-input brand-checkbox" type="checkbox" value="${brand}" id="brand-${brand.replace(/\s+/g, '-')}">
      <label class="form-check-label text-secondary small font-weight-600" for="brand-${brand.replace(/\s+/g, '-')}">
        ${brand}
      </label>
    </div>
  `).join('');

  // Attach event listener
  document.querySelectorAll(".brand-checkbox").forEach(chk => {
    chk.addEventListener("change", () => {
      const checked = Array.from(document.querySelectorAll(".brand-checkbox:checked")).map(el => el.value);
      filterState.selectedBrands = checked;
      renderProducts();
    });
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Search bar inputs
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterState.searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Category Pills
  document.querySelectorAll(".category-pill").forEach(pill => {
    pill.addEventListener("click", function() {
      document.querySelectorAll(".category-pill").forEach(p => p.classList.remove("active"));
      this.classList.add("active");
      filterState.category = this.getAttribute("data-category");
      renderProducts();
    });
  });

  // Diet Radios (All, Veg, Non-Veg)
  document.querySelectorAll("input[name='dietFilter']").forEach(radio => {
    radio.addEventListener("change", (e) => {
      filterState.diet = e.target.value;
      renderProducts();
    });
  });

  // Price Range Slider
  const priceRange = document.getElementById("priceRange");
  const priceValueDisplay = document.getElementById("priceValueDisplay");
  if (priceRange && priceValueDisplay) {
    priceRange.addEventListener("input", (e) => {
      const val = e.target.value;
      priceValueDisplay.textContent = `₹${val}`;
      filterState.maxPrice = parseFloat(val);
      renderProducts();
    });
  }

  // Clear Filters Button
  const clearFiltersBtn = document.getElementById("clearFiltersBtn");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", resetFilters);
  }

  // Apply Promo Coupon in Cart
  const applyCouponBtn = document.getElementById("applyCouponBtn");
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener("click", handleApplyCoupon);
  }
}

// Reset all filters to default
function resetFilters() {
  filterState.category = 'all';
  filterState.searchQuery = '';
  filterState.diet = 'all';
  filterState.maxPrice = 500;
  filterState.selectedBrands = [];

  // Reset UI elements
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = '';

  document.querySelectorAll(".category-pill").forEach(p => {
    p.classList.toggle("active", p.getAttribute("data-category") === 'all');
  });

  const allDietRadio = document.getElementById("dietAll");
  if (allDietRadio) allDietRadio.checked = true;

  const priceRange = document.getElementById("priceRange");
  const priceValueDisplay = document.getElementById("priceValueDisplay");
  if (priceRange && priceValueDisplay) {
    priceRange.value = 500;
    priceValueDisplay.textContent = "₹500";
  }

  document.querySelectorAll(".brand-checkbox").forEach(chk => chk.checked = false);

  renderProducts();
  showToast("Filters reset successfully!", "info");
}

// Filter Logic & Rendering Product Grid
function renderProducts() {
  const container = document.getElementById("productGridContainer");
  const resultCount = document.getElementById("resultCount");
  if (!container) return;

  const filtered = products.filter(item => {
    // Category match
    if (filterState.category !== 'all' && item.category !== filterState.category) {
      return false;
    }
    // Search query match
    if (filterState.searchQuery && !item.name.toLowerCase().includes(filterState.searchQuery) && !item.brand.toLowerCase().includes(filterState.searchQuery)) {
      return false;
    }
    // Diet preference match
    if (filterState.diet === 'veg' && !item.isVeg) return false;
    if (filterState.diet === 'non-veg' && item.isVeg) return false;
    // Price range match
    if (item.price > filterState.maxPrice) return false;
    // Brand match
    if (filterState.selectedBrands.length > 0 && !filterState.selectedBrands.includes(item.brand)) {
      return false;
    }
    return true;
  });

  if (resultCount) {
    resultCount.textContent = `Showing ${filtered.length} products`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="mb-3">
          <i class="bi bi-search display-1 text-muted"></i>
        </div>
        <h4 class="fw-bold">No Products Found</h4>
        <p class="text-secondary">Try adjusting your filter options or search term.</p>
        <button class="btn btn-primary-custom mt-2" onclick="resetFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => `
    <div class="col-sm-6 col-md-4 col-lg-4 mb-4">
      <div class="product-card">
        <span class="badge ${product.badgeColor} product-badge pulse-badge">${product.badge}</span>
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" loading="lazy">
          <button class="btn btn-sm btn-light shadow-sm product-quick-view rounded-pill px-3 fw-bold" onclick="openProductModal(${product.id})">
            <i class="bi bi-eye me-1"></i> Quick View
          </button>
        </div>
        <div class="product-body">
          <div class="d-flex justify-content-between align-items-center mb-1">
            <span class="product-category">${product.categoryLabel}</span>
            <span class="badge-diet ${product.isVeg ? 'veg' : 'non-veg'}" title="${product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
          </div>
          <h5 class="product-title" title="${product.name}">${product.name}</h5>
          <div class="product-rating">
            <i class="bi bi-star-fill"></i> ${product.rating} <span class="text-muted font-weight-normal">(${product.reviews})</span>
            <span class="ms-2 text-muted font-weight-normal">| ${product.brand}</span>
          </div>
          <div class="mt-auto d-flex align-items-center justify-content-between pt-2 border-top">
            <div class="product-price">
              ₹${product.price}
              <span class="original-price">₹${product.originalPrice}</span>
            </div>
            <button class="btn btn-sm btn-primary-custom" onclick="addToCart(${product.id})">
              <i class="bi bi-cart-plus me-1"></i> Add
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Open Product Details Modal
function openProductModal(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  currentModalProductId = productId;
  document.getElementById("modalProductImg").src = product.image;
  document.getElementById("modalProductTitle").textContent = product.name;
  document.getElementById("modalProductBrand").textContent = product.brand;
  document.getElementById("modalProductCategory").textContent = product.categoryLabel;
  document.getElementById("modalProductPrice").textContent = `₹${product.price}`;
  document.getElementById("modalProductOriginalPrice").textContent = `₹${product.originalPrice}`;
  document.getElementById("modalProductDescription").textContent = product.description;
  document.getElementById("modalProductRating").innerHTML = `<i class="bi bi-star-fill text-warning me-1"></i> ${product.rating} (${product.reviews} customer reviews)`;
  
  const dietBadge = document.getElementById("modalProductDiet");
  if (dietBadge) {
    dietBadge.className = `badge ${product.isVeg ? 'bg-success' : 'bg-danger'} rounded-pill px-3 py-2 me-2`;
    dietBadge.innerHTML = `<i class="bi bi-circle-fill me-1"></i> ${product.isVeg ? '100% Veg' : 'Non-Veg'}`;
  }

  document.getElementById("modalQtyInput").value = 1;

  const modalEl = document.getElementById("productModal");
  const modal = new bootstrap.Modal(modalEl);
  modal.show();
}

// Add Item from Modal with custom quantity
function addFromModal() {
  if (!currentModalProductId) return;
  const qty = parseInt(document.getElementById("modalQtyInput").value) || 1;
  addToCart(currentModalProductId, qty);

  const modalEl = document.getElementById("productModal");
  const modalInstance = bootstrap.Modal.getInstance(modalEl);
  if (modalInstance) modalInstance.hide();
}

// Adjust Modal Quantity
function updateModalQty(change) {
  const input = document.getElementById("modalQtyInput");
  if (!input) return;
  let val = parseInt(input.value) || 1;
  val = Math.max(1, val + change);
  input.value = val;
}

// Cart Operations
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.product.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    cart.push({ product, quantity });
  }

  renderCart();
  showToast(`Added ${quantity} x "${product.name}" to your cart!`, "success");
}

function updateCartQty(productId, change) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index > -1) {
    cart[index].quantity += change;
    if (cart[index].quantity <= 0) {
      const removedName = cart[index].product.name;
      cart.splice(index, 1);
      showToast(`Removed "${removedName}" from cart.`, "warning");
    }
  }
  renderCart();
}

function removeFromCart(productId) {
  const index = cart.findIndex(item => item.product.id === productId);
  if (index > -1) {
    const removedName = cart[index].product.name;
    cart.splice(index, 1);
    showToast(`Removed "${removedName}" from cart.`, "warning");
  }
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const cartBadgeCount = document.getElementById("cartBadgeCount");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartTaxEl = document.getElementById("cartTax");
  const cartDeliveryEl = document.getElementById("cartDeliveryFee");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const cartGrandTotalEl = document.getElementById("cartGrandTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");

  const totalItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartBadgeCount) cartBadgeCount.textContent = totalItemCount;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted mb-3 d-block"></i>
        <h5>Your Cart is Empty</h5>
        <p class="text-secondary small">Add fresh groceries to get started!</p>
      </div>
    `;
    if (cartSubtotalEl) cartSubtotalEl.textContent = "₹0.00";
    if (cartTaxEl) cartTaxEl.textContent = "₹0.00";
    if (cartDeliveryEl) cartDeliveryEl.textContent = "₹0.00";
    if (cartDiscountEl) cartDiscountEl.textContent = "₹0.00";
    if (cartGrandTotalEl) cartGrandTotalEl.textContent = "₹0.00";
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.05; // 5% GST
  const deliveryFee = subtotal > 499 || subtotal === 0 ? 0 : 40; // Free delivery above ₹499
  
  let discount = 0;
  if (appliedCoupon === 'SAVE20') {
    discount = subtotal * 0.20; // 20% OFF
  } else if (appliedCoupon === 'FESTIVAL50') {
    discount = 50;
  }

  const grandTotal = Math.max(0, subtotal + tax + deliveryFee - discount);

  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item-card">
      <img src="${item.product.image}" alt="${item.product.name}" class="cart-item-img">
      <div class="flex-grow-1 overflow-hidden">
        <h6 class="mb-1 text-truncate font-weight-700" title="${item.product.name}">${item.product.name}</h6>
        <div class="text-muted small">₹${item.product.price} each</div>
        <div class="d-flex align-items-center gap-2 mt-2">
          <button class="qty-btn" onclick="updateCartQty(${item.product.id}, -1)">-</button>
          <span class="fw-bold px-2">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQty(${item.product.id}, 1)">+</button>
        </div>
      </div>
      <div class="text-end">
        <div class="fw-bold mb-2">₹${item.product.price * item.quantity}</div>
        <button class="btn btn-link text-danger p-0 border-0" onclick="removeFromCart(${item.product.id})" title="Remove item">
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  `).join('');

  if (cartSubtotalEl) cartSubtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
  if (cartTaxEl) cartTaxEl.textContent = `₹${tax.toFixed(2)}`;
  if (cartDeliveryEl) cartDeliveryEl.textContent = deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`;
  if (cartDiscountEl) cartDiscountEl.textContent = `-₹${discount.toFixed(2)}`;
  if (cartGrandTotalEl) cartGrandTotalEl.textContent = `₹${grandTotal.toFixed(2)}`;
}

// Handle Apply Coupon Code
function handleApplyCoupon() {
  const couponInput = document.getElementById("couponInput");
  if (!couponInput) return;
  const code = couponInput.value.trim().toUpperCase();

  if (code === 'SAVE20') {
    appliedCoupon = 'SAVE20';
    showToast("Coupon 'SAVE20' applied! 20% discount added.", "success");
  } else if (code === 'FESTIVAL50') {
    appliedCoupon = 'FESTIVAL50';
    showToast("Coupon 'FESTIVAL50' applied! Flat ₹50 discount added.", "success");
  } else {
    showToast("Invalid coupon code. Try 'SAVE20' or 'FESTIVAL50'", "danger");
    return;
  }
  renderCart();
}

// Copy Coupon Code shortcut helper
function applyPromoDirect(code) {
  const couponInput = document.getElementById("couponInput");
  if (couponInput) {
    couponInput.value = code;
    handleApplyCoupon();
  }
  // Open offcanvas if not open
  const cartOffcanvasEl = document.getElementById("cartOffcanvas");
  if (cartOffcanvasEl) {
    const bsOffcanvas = bootstrap.Offcanvas.getOrCreateInstance(cartOffcanvasEl);
    bsOffcanvas.show();
  }
}

// Toast Feedback System
function showToast(message, type = "info") {
  const toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) return;

  const bgMap = {
    success: "bg-success text-white",
    danger: "bg-danger text-white",
    warning: "bg-warning text-dark",
    info: "bg-dark text-white"
  };

  const toastEl = document.createElement("div");
  toastEl.className = `toast toast-custom align-items-center ${bgMap[type] || bgMap.info} border-0 show mb-2`;
  toastEl.setAttribute("role", "alert");
  toastEl.setAttribute("aria-live", "assertive");
  toastEl.setAttribute("aria-atomic", "true");

  toastEl.innerHTML = `
    <div class="d-flex">
      <div class="toast-body d-flex align-items-center gap-2">
        <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill'}"></i>
        <span>${message}</span>
      </div>
      <button type="button" class="btn-close ${type !== 'warning' ? 'btn-close-white' : ''} me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
  `;

  toastContainer.appendChild(toastEl);

  setTimeout(() => {
    toastEl.classList.remove("show");
    setTimeout(() => toastEl.remove(), 300);
  }, 3000);
}

// Submit Checkout Order
function checkoutOrder() {
  if (cart.length === 0) return;
  alert("🎉 Thank you for your order! FreshMart Express will deliver your groceries within 15 minutes!");
  cart = [];
  appliedCoupon = null;
  renderCart();

  const cartOffcanvasEl = document.getElementById("cartOffcanvas");
  if (cartOffcanvasEl) {
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(cartOffcanvasEl);
    if (bsOffcanvas) bsOffcanvas.hide();
  }
}
