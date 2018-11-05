import axios from 'axios';

const orderState = {};

//action constants for orders
const SET_ORDER = 'SET_ORDER';
const SET_ORDERS = 'SET_ORDERS';
const SET_CURRENT_ORDER_ID = 'SET_CURRENT_ORDER_ID';

//actions for orders
export const setOrders = orders => ({
  type: SET_ORDERS,
  orders
});

export const setOrder = order => ({
  type: SET_ORDER,
  order
});

export const calculateTotal = order => {
  let total = order.lineItems.reduce((sum, lineItem) => (sum + lineItem.totalPrice), 0);
  return total;
};

export const setCurrentOrderId = currentOrderId => ({
    type: SET_CURRENT_ORDER_ID,
    currentOrderId
})

//thunks for orders
export const fetchOrders = (status = null) => {
  return async (dispatch) => {
    try{
      let url;
      if (status) {
        url = `/api/orders?status=${status}`;
      } else {
        url = '/api/orders';
      }
      const { data } = await axios.get(url);
      dispatch(setOrders(data));
    } catch(err) {
      console.error(err);
    }
  }
};

export const fetchSingleOrder = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`);
      dispatch(setOrder(data));
    } catch(err) {
      console.error(err);
    }
  }
};

export const createOrder = (newData) => {
  return async (dispatch) => {
    const { data } = await axios.post(`/api/orders`, newData);
    dispatch(setOrder(data));
    dispatch(setCurrentOrderId(data.id));
  }
}

export const updateOrder = (orderId, newData) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/orders/${orderId}`, newData);
    dispatch(setOrder(data));
  }
};

//thunks for lineItems

export const addToCart = (product, currentOrderId) => {
  let quantity = 1;
  return async (dispatch) => {
    let orderId;
    if (currentOrderId) {
      orderId = currentOrderId;
    } else {
      const {data} = await axios.post(`/api/orders`, {});
      orderId = data.id;
    };

    const itemInfo = {
      quantity,
      totalPrice: product.price * quantity,
      productId: product.id,
      orderId
    }

    await axios.post(`/api/lineItems`, itemInfo);
    const {data} = await axios.get(`/api/orders/${orderId}`);

    dispatch(setOrder(data));
    dispatch(setCurrentOrderId(orderId));
  }
};

export const updateQuantity = (quantity, lineItemId) => {
  return async (dispatch) => {
    const lineItem = await axios.put(`/api/lineItems/${lineItemId}`, { quantity });
    const orderId = lineItem.data.orderId;
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch(setOrder(data));
  }
};

export const removeItem = (lineItemId, orderId) => {
  return async (dispatch) => {
    await axios.delete(`/api/lineItems/${lineItemId}`);
    const { data } = axios.get(`/api/orders/${orderId}`);
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
      case SET_CURRENT_ORDER_ID:
        {
          return {...state, currentOrderId: action.currentOrderId}
        }
      default:
        return state;
    }
  } catch (err) {
    console.error(err);
  }
};

export default orderReducer;
