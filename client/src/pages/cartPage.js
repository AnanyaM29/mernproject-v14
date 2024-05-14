import React, { useState, useEffect } from "react";
import Layout from "./../components/Layouts/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import { AiFillWarning } from "react-icons/ai";
import Stripe from "stripe";
import axios from "axios";
import toast from "react-hot-toast";
import "./../styles/Otherstyles.css";



const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
    
  let cartobj = {
    items : [],
    currency : "INR"
  };


// const apiKey = 'sk_test_51OrHbDSDNuWHR1QPwOw5mdhiyotUPJO4p3rELZQWfhjuTcGJqLKRZCviJfzYJAx4lLm4VKE4Lk6S2rU1q2suC5CG00dGb6aUQj';
// const stripeClient = new stripe(apiKey);

// const createSession = async () => {
//   try {
//     const session = await stripeClient.checkout.sessions.create({
//       success_url: 'https://example.com/success',
//       line_items: [
//         {
//           price: 'price_1MotwRLkdIwHu7ixYcPLm5uZ',
//           quantity: 2,
//         },
//       ],
//       mode: 'payment',
//     });
//     console.log('Session created:', session);
//   } catch (error) {
//     console.error('Error creating session:', error);
//   }
// };

// createSession();

// Set your secret API key
const apiKey = "sk_test_51OrHbDSDNuWHR1QPwOw5mdhiyotUPJO4p3rELZQWfhjuTcGJqLKRZCviJfzYJAx4lLm4VKE4Lk6S2rU1q2suC5CG00dGb6aUQj"
  cartobj.items = cart;
  console.log("This is", cartobj.items);
  const cartItems = cartobj.items.map((item) => ({
    price_data: {
      currency: cartobj.currency,
      product_data: {
        name: item.name,
        // You can add more product details here if needed
      },
      unit_amount: item.price * 100, // Stripe requires amount in cents
    },
    quantity: 1,
  }));

const stripeClient = new Stripe(apiKey);
let paymentUrl;
const createSession = async () => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      success_url: 'https://example.com/success',
      line_items:cartItems ,
      mode: 'payment',
    });
    console.log('Session created:', session);
    paymentUrl=session.url;
  } catch (error) {
    console.error('Error creating session:', error);
  }
};

createSession();
// console.log("This is",cartItems);
//   // Create a session
//   fetch("https://api.stripe.com/v1/checkout/sessions", {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       // payment_method_types: ["card"],
//       line_items: cartItems,
//       mode: "payment",
//       success_url: "https://example.com/success",
//       cancel_url: "https://example.com/cancel",
//     }),
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     // Print the session URL
//     console.log("Payment link:", data.url);
//   })
//   .catch((error) => {
//     console.error("Error creating session:", error);
//   });







  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //detele item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payments
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("Payment Completed Successfully ");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <Layout>
    <div className="cart-page">
      <div className="row">
        <div className="col-md-12">
          <h1 className="text-center bg-light p-2 mb-1 home-text">Whishlist</h1>
          <p className="text-center">
            {cart?.length
              ? `You have ${cart.length} items in your wishlist${
                  auth?.token ? "" : " (Please login to checkout)"
                }`
              : "No items found! Choose from our curated lists!"}
          </p>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {cart?.map((p) => (
              <div className="cart-item mb-3 " key={p._id}>
                <div className="row g-0 ">
                  <div className="col-md-4">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img"
                      alt={p.name}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">
                        {p.description.substring(0, 100)}
                      </p>
                      <p className="card-text">Price: {p.price}</p>
                      <button
                        className="btn btn-danger btn-remove"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          )  )}
          </div>
          <div className="col-md-4">
            <div className="card cart cart-summary">
              <div className="card-body">
                <h5 className="card-title">Buy now!</h5>
                <hr />
                <p>Total: {totalPrice()}</p>
                {auth?.user?.address ? (
                  <div className="mb-5 ">
                    <h4>Current Address</h4>
                    <h5>{auth?.user?.address}</h5>
                    <button
                      className=" btn btn-outline-warning with-black-font"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>

                    <button
                      className="btn btn-outline-warning with-black-font"
                      onClick={() => window.open(paymentUrl, '_blank')}
                    >
                      Payment Checkout
                    </button>
                  </div>
                ) : (
                  <div className="mb-3">
                    {auth?.token ? (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() => navigate("/dashboard/user/profile")}
                      >
                        Update Address
                      </button>
                    ) : (
                      <button
                        className="btn btn-outline-warning"
                        onClick={() =>
                          navigate("/login", {
                            state: "/cart",
                          })
                        }
                      >
                        Please Login to Checkout
                      </button>
                    )}
                  </div>
                )}
                <div className="mt-2">
                  {!clientToken || !auth?.token || !cart?.length ? (
                    ""
                  ) : (
                    <>
                      <DropIn
                        options={{
                          authorization: clientToken,
                          paypal: {
                            flow: "vault",
                          },
                        }}
                        onInstance={(instance) => setInstance(instance)}
                      />

                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={
                          loading || !instance || !auth?.user?.address
                        }
                      >
                        {loading ? "Processing ...." : "Proceed to Checkout"}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
  
  );
};

export default CartPage;