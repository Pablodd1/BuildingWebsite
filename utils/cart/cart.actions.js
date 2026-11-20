import { getCart, addOne, removeOne, addContainer, removeContainer } from "./cart.core"
import { emitCart } from "./cart.events"

export function addContainerAction(container) {
  addContainer(container)
  emitCart()
}

export function addProduct(containerId, product, qty) {
  addOne(containerId, product, qty)
  emitCart()
}

export function removeProduct(containerId, productId) {
  removeOne(containerId, productId)
  emitCart()
}

export function deleteContainer(containerId) {
  removeContainer(containerId)
  emitCart()
}
