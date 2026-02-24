import React, { createContext, useContext, useReducer } from 'react'

// Simple order context storing items { wine, quantity }.
const OrderStateContext = createContext()
const OrderDispatchContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const payloadId = action.payload._id || action.payload.id
      const existing = state.items.find(i => (i.wine._id || i.wine.id) === payloadId)
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            (i.wine._id || i.wine.id) === payloadId ? { ...i, quantity: i.quantity + 1 } : i
          )
        }
      }
      return { ...state, items: [...state.items, { wine: action.payload, quantity: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => (i.wine._id || i.wine.id) !== action.payload) }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      throw new Error('Unknown action: ' + action.type)
  }
}

export function OrderProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] })
  return (
    <OrderStateContext.Provider value={state}>
      <OrderDispatchContext.Provider value={dispatch}>
        {children}
      </OrderDispatchContext.Provider>
    </OrderStateContext.Provider>
  )
}

export function useOrder() {
  return useContext(OrderStateContext)
}
export function useOrderDispatch() {
  return useContext(OrderDispatchContext)
}
