import { uiActions } from "./ui-slice";
import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Loading cart data.",
      })
    );

    fetch(
      "https://react-cart-redux-aeff2-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Loading cart data failed");
        }
        return response.json();
      })
      .then((responseData) => {
        dispatch(
          cartActions.replaceCart({
            items: responseData.items || [],
            totalQuantity: responseData.totalQuantity,
          })
        );
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Load cart data successfully.",
          })
        );
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      });
  };
};

export const sendCartData = (cart) => {
  return (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data.",
      })
    );

    fetch(
      "https://react-cart-redux-aeff2-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json",
      {
        method: "PUT",
        body: JSON.stringify({
          items: cart.items,
          totalQuantity: cart.totalQuantity,
        }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Sending cart data failed");
        }
        return response.json();
      })
      .then((_) => {
        dispatch(
          uiActions.showNotification({
            status: "success",
            title: "Success",
            message: "Send cart data successfully.",
          })
        );
      })
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error!",
            message: error.message,
          })
        );
      });
  };
};
