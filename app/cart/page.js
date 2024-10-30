"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../store/cartSlice";
import { useLanguageData } from "../../components/hook/useLanguageData";
import Button from "@/components/common/Button";
import styles from "./cartpage.module.css";

export default function CartPage() {
  const { language, translations } = useLanguageData();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  console.log(cartItems);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, change) => {
    dispatch(updateQuantity({ id, change }));
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <h1 className={styles.cartTitle}>
          {translations[language]?.Detail[1]}
        </h1>
        <div className={styles.cartItems}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <img
                  src={item.preview}
                  alt={item.name}
                  className={styles.image}
                />
                <div className={styles.itemDetails}>
                  <h2 className={styles.itemName}>{item.name}</h2>
                  <p className={styles.itemPrice}>
                    {translations[language]?.Detail[3]}: {item.price}
                  </p>
                  <div className={styles.quantityControl}>
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className={`${styles.quantityButton} ${
                        item.quantity === 1 ? styles.disabledButton : ""
                      }`}
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className={styles.quantityButton}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  width="80px"
                  height="30px"
                  label={translations[language]?.Detail[4]}
                  onClick={() => handleRemove(item.id)}
                />
              </div>
            ))
          ) : (
            <p className={styles.emptyCart}>
              {translations[language]?.Detail[5]}
            </p>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className={styles.total}>
            <div className={styles.totalDetail}>
              <span>{translations[language]?.Detail[6]}:</span>
              <span className={styles.totalAmount}>{totalAmount}</span>
            </div>
            <div className={styles.buttonContainer}>
              <Button
                width="60%"
                height="50px"
                label={translations[language]?.Detail[7]}
                disabled={cartItems.length === 0}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
