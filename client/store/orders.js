import axios from 'axios';

const orderState = {};

//action constants for orders
const SET_ORDER = 'SET_ORDER';
const SET_ORDERS = 'SET_ORDERS';

//actions for orders
export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
});

export const setOrder = order => ({
  type: SET_ORDER,
  order
});

const calculateTotal = (order) => {
  let total = order.lineItems.reduce((sum, lineItem) => (sum + lineItem.totalPrice), 0);
  return total;
};

//thunks for orders
export const fetchOrders = (status) => {
  return async (dispatch) => {
    let url;
    if (status) {
      url = `api/orders?status=${status}`;
    } else {
      url = 'api/orders';
    }
    const { data } = await axios.get(url);
    dispatch(setOrders(data));
  }
};

export const fetchSingleOrder = (orderId) => {
  return async (dispatch) => {
    const { data } = await axios.get(`api/orders/${orderId}`);
    dispatch(setOrder(data));
  }
};

export const updateOrder = (orderId, newData) => {
  return async (dispatch) => {
    const { data } = await axios.put(`api/orders/${orderId}`, newData);
    dispatch(setOrder(data));
  }
};

//thunks for lineItems
export const addItem = (itemData) => {
  return async (dispatch) => {
    const lineItem = await axios.post(`api/lineItems`, itemData);
    const orderId = lineItem.data.orderId;
    const { data } = await axios.get(`api/orders/${orderId}`);
    dispatch(setOrder(data));
  }
}

export const updateQuantity = (quantity, lineItemId) => {
  return async (dispatch) => {
    const lineItem = await axios.put(`api/lineItems/${lineItemId}`, { quantity });
    const orderId = lineItem.data.orderId;
    const { data } = await axios.get(`api/orders/${orderId}`);
    dispatch(setOrder(data));
  }
};

export const deleteItem = (lineItemId, orderId) => {
  return async (dispatch) => {
    await axios.delete(`api/lineItems/${lineItemId}`);
    const { data } = axios.get(`api/orders/${orderId}`);
    dispatch(setOrder(data));
  }
}

const orderReducer = (state = orderState, action) => {
  try {
    switch (action.type) {
      case SET_ORDERS:
        {
          action.orders.forEach(order => {
            order.total = calculateTotal(order);
            state[order.id.toString()] = order;
          });
          return { ...state };
        }
      case SET_ORDER:
        {
          const order = action.order;
          order.total = calculateTotal(order);
          state[order.id.toString()] = order;
          return { ...state };
        }
      default:
        return state;
    }
  } catch (err) {
    console.error(err);
  }
};

export default orderReducer;
