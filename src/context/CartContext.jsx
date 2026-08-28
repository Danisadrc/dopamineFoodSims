import { createContext, useContext, useEffect, useMemo, useReducer } from "react";

const CartContext = createContext(null);
const STORAGE_KEY = "meoweat-cart-v1";

function initCart() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const existing = state.find((item) => item.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.id === action.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.product, quantity: 1 }];
    }
    case "DECREMENT":
      return state
        .map((item) =>
          item.id === action.id
            ? { ...item, quantity: Math.max(0, item.quantity - 1) }
            : item
        )
        .filter((item) => item.quantity > 0);
    case "REMOVE":
      return state.filter((item) => item.id !== action.id);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export const PROMO_CODES = {
  MEOW15: {
    label: "MEOW15",
    type: "percent",
    value: 0.15,
    cap: 30000,
  },
  OYEN10: {
    label: "OYEN10",
    type: "percent",
    value: 0.10,
    cap: 20000,
  },
  CAT50K: {
    label: "CAT50K",
    type: "fixed",
    value: 50000,
    cap: 50000,
  },
};

export function calculateOrder(items, promoCode = "") {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const baseDiscount = Math.min(Math.floor(subtotal * 0.15), subtotal);

  const promo = PROMO_CODES[promoCode?.trim().toUpperCase()];
  const promoDiscount = promo
    ? promo.type === "fixed"
      ? Math.min(promo.value, Math.max(0, subtotal - baseDiscount))
      : Math.min(
          Math.floor((subtotal - baseDiscount) * promo.value),
          promo.cap
        )
    : 0;

  const serviceFee = items.length ? 5000 : 0;
  const taxableAmount = Math.max(0, subtotal - baseDiscount - promoDiscount);
  const tax = Math.round(taxableAmount * 0.11);

  const total = Math.max(
    0,
    subtotal - baseDiscount - promoDiscount + serviceFee + tax
  );

  return {
    itemCount,
    subtotal,
    discount: baseDiscount,
    promoDiscount,
    serviceFee,
    tax,
    total,
  };
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, initCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo(() => {
    const base = calculateOrder(items);

    return {
      items,
      addItem: (product) => dispatch({ type: "ADD", product }),
      decrement: (id) => dispatch({ type: "DECREMENT", id }),
      removeItem: (id) => dispatch({ type: "REMOVE", id }),
      clear: () => dispatch({ type: "CLEAR" }),
      itemCount: base.itemCount,
      subtotal: base.subtotal,
      discount: base.discount,
      promoDiscount: base.promoDiscount,
      serviceFee: base.serviceFee,
      tax: base.tax,
      total: base.total,
      calculateWithPromo: (code) => calculateOrder(items, code),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
