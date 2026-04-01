
/*
Expected Structure
__cart__ = [
  {
    name: "XYZ Container",
    id: "container-id",
    type: "container",
    dimension: { length, width, height },
    items: [
      {
        name: "PVC Sheet 1",
        id: "product-id",
        type: "product",
        qty: 123,
        dimension: { length, width, height }
      },
      ...
    ]
  },
  ...
]
*/
const CART_KEY = "__cart__"

let cart = []
let initialized = false

export function initCart() {
  if (typeof window === "undefined") return
  try {
    const stored = sessionStorage.getItem(CART_KEY)
    const parsed = stored ? JSON.parse(stored) : null
    cart = Array.isArray(parsed) ? parsed : []
  } catch {
    cart = []
  }
  initialized = true
}

// Auto-init if not yet initialized (e.g., when called before CartInit mounts)
function ensureInit() {
  if (!initialized && typeof window !== "undefined") {
    initCart()
  }
}

function persist() {
  sessionStorage.setItem(CART_KEY, JSON.stringify(cart))
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"))
  }
}

export function getCart() {
  ensureInit()
  return cart
}

// Add a new container
export function addContainer(container) {
  ensureInit()
  if (!container.id) throw new Error("Container must have id")
  // Prevent duplicate containers
  if (cart.find(c => c.id === container.id)) return
  cart.push({ ...container, items: [] })
  persist()
}

// Add one product to container
export function addOne(containerId, product, qty) {
  ensureInit()
  const container = cart.find(c => c.id === containerId)
  if (!container) {
    console.warn("[cart] addOne: Container not found:", containerId, "Cart state:", cart.map(c=>c.id))
    return
  }

  const existing = container.items.find(i => i.id === product.id)
  if (existing) {
    existing.qty = qty ? qty : Number(existing.qty) + 1
  } else {
    container.items.push({ ...product, qty: 1, type: "product" })
  }
  persist()
}

// Remove one product from container
export function removeOne(containerId, productId) {
  const container = cart.find(c => c.id === containerId)
  if (!container) return

  const index = container.items.findIndex(i => i.id === productId)
  if (index === -1) return

  container.items[index].qty -= 1
  if (container.items[index].qty <= 0) container.items.splice(index, 1)

  persist()
}

// Remove container entirely
export function removeContainer(containerId) {
  const index = cart.findIndex(c => c.id === containerId)
  if (index !== -1) cart.splice(index, 1)
  persist()
}

// Set exact quantity of an item
export function setQty(containerId, product, newQty) {
  const container = cart.find(c => c.id === containerId)
  if (!container) throw new Error("Container not found")

  const existing = container.items.find(i => i.id === product.id)
  
  if (newQty <= 0) {
      if (existing) {
          container.items = container.items.filter(i => i.id !== product.id)
      }
  } else {
      if (existing) {
          existing.qty = newQty
      } else {
          container.items.push({ ...product, qty: newQty, type: "product" })
      }
  }
  
  persist()
}
