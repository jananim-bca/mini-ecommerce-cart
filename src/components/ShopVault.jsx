import React, { useState, useEffect, useRef } from "react";

const products = [
  {
    id: 1,
    name: "Wireless Mouse",
    price: 499,
    originalPrice: 799,
    rating: 4.3,
    reviews: 1240,
    badge: "Best Seller",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400",
  },
  {
    id: 2,
    name: "Gaming Keyboard",
    price: 999,
    originalPrice: 1599,
    rating: 4.7,
    reviews: 876,
    badge: "Top Rated",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=400",
  },
  {
    id: 3,
    name: "Bluetooth Headphones",
    price: 1499,
    originalPrice: 2199,
    rating: 4.5,
    reviews: 2104,
    badge: "32% OFF",
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 2499,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 654,
    badge: "New",
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 699,
    originalPrice: 999,
    rating: 4.2,
    reviews: 432,
    badge: "30% OFF",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1625895197185-efcec01cffe0?w=400",
  },
  {
    id: 6,
    name: "Webcam HD",
    price: 1299,
    originalPrice: 1799,
    rating: 4.4,
    reviews: 310,
    badge: "Hot",
    category: "Peripherals",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400",
  },
];

const CATEGORIES = ["All", ...new Set(products.map((p) => p.category))];

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#f59e0b" : "none"}
          stroke="#f59e0b"
          strokeWidth="2"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
      <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 2 }}>
        ({rating})
      </span>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2800);
    return () => clearTimeout(t);
  }, [onClose]);

  const colors = {
    success: { bg: "#10b981", icon: "✓" },
    remove: { bg: "#ef4444", icon: "✕" },
    info: { bg: "#6366f1", icon: "ℹ" },
  };
  const c = colors[type] || colors.info;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 28,
        right: 28,
        background: c.bg,
        color: "#fff",
        padding: "12px 20px",
        borderRadius: 10,
        fontWeight: 600,
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        gap: 10,
        boxShadow: "0 8px 30px rgba(0,0,0,0.25)",
        zIndex: 9999,
        animation: "slideUp 0.3s ease",
      }}
    >
      <span
        style={{
          background: "rgba(255,255,255,0.25)",
          borderRadius: "50%",
          width: 22,
          height: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        {c.icon}
      </span>
      {message}
    </div>
  );
}

function ProductCard({ product, cartItem, onAdd, onIncrease, onDecrease, onWishlist, isWished }) {
  const [hovered, setHovered] = useState(false);
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );
  const qty = cartItem?.quantity || 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#1e293b",
        borderRadius: 16,
        overflow: "hidden",
        border: hovered ? "1.5px solid #6366f1" : "1.5px solid #334155",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.25s ease",
        boxShadow: hovered ? "0 20px 40px rgba(99,102,241,0.15)" : "0 2px 8px rgba(0,0,0,0.2)",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Badge */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          background: product.badge === "New" ? "#6366f1" : product.badge === "Top Rated" ? "#f59e0b" : "#10b981",
          color: "#fff",
          fontSize: 10,
          fontWeight: 700,
          padding: "3px 9px",
          borderRadius: 20,
          letterSpacing: 0.5,
          zIndex: 2,
        }}
      >
        {product.badge}
      </div>

      {/* Wishlist */}
      <button
        onClick={() => onWishlist(product.id)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: isWished ? "#ef444422" : "rgba(15,23,42,0.7)",
          border: isWished ? "1.5px solid #ef4444" : "1.5px solid #334155",
          borderRadius: "50%",
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 2,
          transition: "all 0.2s",
          color: isWished ? "#ef4444" : "#64748b",
          fontSize: 16,
        }}
      >
        {isWished ? "♥" : "♡"}
      </button>

      {/* Image */}
      <div
        style={{
          background: "#0f172a",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: 180,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.3s ease",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 10, color: "#6366f1", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>
          {product.category}
        </span>
        <h3 style={{ margin: 0, fontSize: 15, color: "#f1f5f9", fontWeight: 700 }}>
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <span style={{ fontSize: 11, color: "#475569" }}>{product.reviews.toLocaleString()} reviews</span>

        <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginTop: 4 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: "#f1f5f9" }}>₹{product.price.toLocaleString()}</span>
          <span style={{ fontSize: 13, color: "#475569", textDecoration: "line-through" }}>
            ₹{product.originalPrice.toLocaleString()}
          </span>
          <span style={{ fontSize: 12, color: "#10b981", fontWeight: 700 }}>{discount}% off</span>
        </div>

        <div style={{ marginTop: "auto", paddingTop: 12 }}>
          {qty === 0 ? (
            <button
              onClick={() => onAdd(product)}
              style={{
                width: "100%",
                padding: "10px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "opacity 0.2s",
                letterSpacing: 0.3,
              }}
              onMouseEnter={(e) => (e.target.style.opacity = 0.85)}
              onMouseLeave={(e) => (e.target.style.opacity = 1)}
            >
              + Add to Cart
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#0f172a",
                borderRadius: 10,
                padding: "4px",
                border: "1.5px solid #6366f1",
              }}
            >
              <button
                onClick={() => onDecrease(product.id)}
                style={{
                  width: 34,
                  height: 34,
                  background: "#1e293b",
                  color: "#f1f5f9",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </button>
              <span style={{ color: "#6366f1", fontWeight: 800, fontSize: 16, minWidth: 20, textAlign: "center" }}>
                {qty}
              </span>
              <button
                onClick={() => onIncrease(product.id)}
                style={{
                  width: 34,
                  height: 34,
                  background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 8,
                  fontWeight: 800,
                  fontSize: 18,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState("");
  const toastId = useRef(0);

  const showToast = (message, type) => {
    toastId.current += 1;
    setToast({ message, type, id: toastId.current });
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.id === product.id);
      if (ex) return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`${product.name} added to cart`, "success");
  };

  const increaseQty = (id) =>
    setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));

  const decreaseQty = (id) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.quantity === 1) {
        showToast(`${item.name} removed`, "remove");
        return prev.filter((i) => i.id !== id);
      }
      return prev.map((i) => i.id === id ? { ...i, quantity: i.quantity - 1 } : i);
    });
  };

  const removeFromCart = (id) => {
    const item = cart.find((i) => i.id === id);
    setCart((prev) => prev.filter((i) => i.id !== id));
    showToast(`${item?.name} removed`, "remove");
  };

  const toggleWishlist = (id) => {
    const product = products.find((p) => p.id === id);
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((w) => w !== id)
        : [...prev, id]
    );
    const isNowWished = !wishlist.includes(id);
    showToast(
      isNowWished ? `${product?.name} wishlisted ♥` : `Removed from wishlist`,
      isNowWished ? "success" : "remove"
    );
  };

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "SAVE10") {
      setDiscount(10);
      setCouponMsg("10% discount applied!");
    } else if (coupon.toUpperCase() === "FLAT200") {
      setDiscount(0);
      setCouponMsg("₹200 flat off applied!");
    } else {
      setDiscount(0);
      setCouponMsg("Invalid coupon code.");
    }
  };

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const couponDiscount =
    coupon.toUpperCase() === "FLAT200" && couponMsg.includes("applied")
      ? 200
      : Math.round((subtotal * discount) / 100);
  const shipping = subtotal > 1999 ? 0 : 99;
  const total = subtotal - couponDiscount + shipping;
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const filtered = products.filter((p) => {
    const catMatch = activeCategory === "All" || p.category === activeCategory;
    const searchMatch = p.name.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Inter', sans-serif", color: "#f1f5f9" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #1e293b; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>

      {/* HEADER */}
      <header
        style={{
          background: "rgba(15,23,42,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #1e293b",
          position: "sticky",
          top: 0,
          zIndex: 100,
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18,
          }}>🛍</div>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: -0.5 }}>ShopVault</span>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 360, margin: "0 32px", position: "relative" }}>
          <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#475569", fontSize: 15 }}>🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            style={{
              width: "100%",
              background: "#1e293b",
              border: "1.5px solid #334155",
              color: "#f1f5f9",
              padding: "9px 14px 9px 36px",
              borderRadius: 10,
              fontSize: 14,
              outline: "none",
            }}
          />
        </div>

        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff",
            border: "none",
            borderRadius: 12,
            padding: "10px 20px",
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            position: "relative",
          }}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={{
              background: "#ef4444",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 800,
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>

        {/* Hero */}
        <div style={{
          background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1a1040 100%)",
          border: "1px solid #334155",
          borderRadius: 20,
          padding: "40px 48px",
          marginBottom: 36,
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200,
            background: "radial-gradient(circle, rgba(99,102,241,0.2), transparent 70%)",
            borderRadius: "50%",
          }} />
          <span style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase" }}>
            Exclusive Deals
          </span>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: "8px 0 4px", letterSpacing: -1 }}>
            Premium Tech, Unreal Prices
          </h2>
          <p style={{ color: "#64748b", fontSize: 15 }}>
            Free shipping above ₹1,999 · Use <strong style={{ color: "#6366f1" }}>SAVE10</strong> or <strong style={{ color: "#6366f1" }}>FLAT200</strong> at checkout
          </p>
        </div>

        {/* Category Filter */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "7px 18px",
                borderRadius: 20,
                border: "1.5px solid",
                borderColor: activeCategory === cat ? "#6366f1" : "#334155",
                background: activeCategory === cat ? "rgba(99,102,241,0.15)" : "transparent",
                color: activeCategory === cat ? "#6366f1" : "#64748b",
                fontWeight: 600,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#475569", fontSize: 16 }}>
            No products found for "{search}"
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartItem={cart.find((i) => i.id === product.id)}
                onAdd={addToCart}
                onIncrease={increaseQty}
                onDecrease={decreaseQty}
                onWishlist={toggleWishlist}
                isWished={wishlist.includes(product.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* CART DRAWER */}
      {cartOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            display: "flex", justifyContent: "flex-end",
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setCartOpen(false)}
            style={{
              position: "absolute", inset: 0,
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
              animation: "fadeIn 0.2s ease",
            }}
          />

          {/* Panel */}
          <div style={{
            position: "relative",
            width: "min(420px, 100vw)",
            height: "100%",
            background: "#0f172a",
            borderLeft: "1px solid #1e293b",
            display: "flex",
            flexDirection: "column",
            animation: "slideIn 0.3s ease",
          }}>
            {/* Drawer header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800 }}>Shopping Cart</h2>
                <span style={{ fontSize: 13, color: "#475569" }}>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: "#1e293b", border: "1px solid #334155",
                  color: "#94a3b8", borderRadius: 8, width: 34, height: 34,
                  cursor: "pointer", fontSize: 16, display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}
              >✕</button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign: "center", paddingTop: 80, color: "#334155" }}>
                  <div style={{ fontSize: 56, marginBottom: 16 }}>🛒</div>
                  <p style={{ fontSize: 16, fontWeight: 600, color: "#475569" }}>Your cart is empty</p>
                  <p style={{ fontSize: 13, color: "#334155", marginTop: 6 }}>Add some products to get started</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        background: "#1e293b",
                        borderRadius: 14,
                        padding: 14,
                        display: "flex",
                        gap: 12,
                        border: "1px solid #334155",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: 64, height: 64, objectFit: "contain", borderRadius: 10, background: "#0f172a", padding: 4 }}
                      />
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{item.name}</p>
                        <p style={{ color: "#6366f1", fontWeight: 800, fontSize: 15 }}>
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p style={{ color: "#475569", fontSize: 12 }}>₹{item.price.toLocaleString()} each</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <button
                              onClick={() => decreaseQty(item.id)}
                              style={{
                                width: 26, height: 26, borderRadius: 6,
                                background: "#334155", border: "none", color: "#f1f5f9",
                                cursor: "pointer", fontWeight: 800, fontSize: 16,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >−</button>
                            <span style={{ fontWeight: 800, fontSize: 15, color: "#6366f1", minWidth: 20, textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => increaseQty(item.id)}
                              style={{
                                width: 26, height: 26, borderRadius: 6,
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                                border: "none", color: "#fff",
                                cursor: "pointer", fontWeight: 800, fontSize: 16,
                                display: "flex", alignItems: "center", justifyContent: "center",
                              }}
                            >+</button>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              background: "rgba(239,68,68,0.1)",
                              border: "1px solid rgba(239,68,68,0.3)",
                              color: "#ef4444",
                              borderRadius: 6,
                              padding: "3px 10px",
                              fontSize: 12,
                              cursor: "pointer",
                              fontWeight: 600,
                            }}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: "1px solid #1e293b" }}>
                {/* Coupon */}
                <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                  <input
                    value={coupon}
                    onChange={(e) => { setCoupon(e.target.value); setCouponMsg(""); }}
                    placeholder="Coupon code"
                    style={{
                      flex: 1, background: "#1e293b", border: "1.5px solid #334155",
                      color: "#f1f5f9", padding: "9px 14px", borderRadius: 10, fontSize: 13, outline: "none",
                    }}
                  />
                  <button
                    onClick={applyCoupon}
                    style={{
                      background: "#1e293b", border: "1.5px solid #6366f1",
                      color: "#6366f1", borderRadius: 10, padding: "9px 16px",
                      fontWeight: 700, fontSize: 13, cursor: "pointer",
                    }}
                  >Apply</button>
                </div>
                {couponMsg && (
                  <p style={{
                    fontSize: 12, marginBottom: 12, fontWeight: 600,
                    color: couponMsg.includes("Invalid") ? "#ef4444" : "#10b981",
                  }}>
                    {couponMsg.includes("Invalid") ? "✕" : "✓"} {couponMsg}
                  </p>
                )}

                {/* Price Breakdown */}
                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                  {[
                    ["Subtotal", `₹${subtotal.toLocaleString()}`],
                    ...(couponDiscount > 0 ? [["Discount", `-₹${couponDiscount.toLocaleString()}`]] : []),
                    ["Shipping", shipping === 0 ? "FREE 🎉" : `₹${shipping}`],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                      <span style={{ color: "#64748b" }}>{label}</span>
                      <span style={{ color: label === "Discount" ? "#10b981" : "#f1f5f9", fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                  <div style={{ height: 1, background: "#1e293b", margin: "4px 0" }} />
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontWeight: 800, fontSize: 16 }}>Total</span>
                    <span style={{ fontWeight: 800, fontSize: 18, color: "#6366f1" }}>₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: "pointer",
                    letterSpacing: 0.3,
                  }}
                  onClick={() => {
                    showToast("Order placed successfully! 🎉", "success");
                    setCart([]);
                    setCoupon("");
                    setDiscount(0);
                    setCouponMsg("");
                    setCartOpen(false);
                  }}
                >
                  Checkout · ₹{total.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <Toast key={toast.id} message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}