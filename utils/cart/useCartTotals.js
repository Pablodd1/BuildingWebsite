import { useEffect, useState } from "react"
import { totalQty, itemQty } from "./cart.selectors"
import { subscribeCart } from "./cart.events"
import { getCart } from "./cart.core"

export function useCartTotal() {
  const [total, setTotal] = useState(totalQty())

  useEffect(() => {
    return subscribeCart(() => {
      setTotal(totalQty())
    })
  }, [])

  return total
}

// itemQty now requires containerId
export function useCartItemQty(containerId, productId) {
  const [qty, setQty] = useState(() => itemQty(containerId, productId))

  useEffect(() => {
    return subscribeCart(() => {
      setQty(itemQty(containerId, productId))
    })
  }, [containerId, productId])

  return qty
}

export function useAllContainers(exDependency) {
  const [containers, setContainers] = useState(getCart())

  useEffect(() => {
    const unsub = subscribeCart(() => {
      setContainers([...getCart()])
    })
    return unsub
  }, [exDependency])

  return containers
}

export function useContainer(containerId) {
  const findContainer = () => getCart().find(c => c.id === containerId) || null

  const [container, setContainer] = useState(findContainer())

  useEffect(() => {
    const unsub = subscribeCart(() => {
      setContainer(findContainer())
    })
    return unsub
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId])

  return container
}
