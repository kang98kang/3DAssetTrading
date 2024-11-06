"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import { addToCart } from "../../store/cartSlice";
import useFetchDetailData from "../../../components/hook/useFetchDetailData";
import { useLanguageData } from "../../../components/hook/useLanguageData";
import useCheckout from "../../../components/hook/useCheckout";
import Button from "@/components/common/Button";
import PayModal from "../../../components/widget/payment/PayModal";
import LoginModal from "../../../components/widget/login/LoginModal";
import Slider from "@/components/common/Slider";
import styles from "../detailpage.module.css";

export default function Detail() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { language, translations } = useLanguageData();
  const {
    isPayModalOpen,
    isLoginModalOpen,
    closePayModal,
    closeLoginModal,
    handleCheckout,
  } = useCheckout();

  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useFetchDetailData({ id });

  if (!data) return <div>Loading...</div>;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...data, quantity: 1 }));
    router.push("/cart");
  };

  const handlePaymentSuccess = (details) => {
    closePayModal();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.minheader}>
        <div className={styles.productContainer}>
          <div className={styles.leftSection}>
            <span className={styles.filename}>{data.name}</span>
          </div>
          <div className={styles.rightSection}>
            <span className={styles.price}>{data.price}$</span>
            <Button
              onClick={handleCheckout}
              backgroundColor={
                process.env.NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY
              }
              width="auto"
              height="40px"
              label={translations[language]?.Detail[0]}
            />
            <Button
              backgroundColor={
                process.env.NEXT_PUBLIC_BACKGROUND_COLOR_TERTIARY
              }
              width="auto"
              height="40px"
              label={translations[language]?.Detail[1]}
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>

      <div className={styles.slideInfo}>
        {currentIndex + 1} of {data.modeling?.length || 0}
      </div>

      <Slider
        images={data.modeling || []}
        currentIndex={currentIndex}
        setCurrentIndex={setCurrentIndex}
      />

      <div className={styles.contentContainer}>
        <div className={styles.mainContent}>
          <div className={styles.mainTitle}>Description</div>
          <p className={styles.mainDetail}>{data.description}</p>
        </div>
        <div className={styles.sideContent}>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>FILE</div>
            <div className={styles.sideContentDetail}>
              {data.file.map((ext, index) => (
                <div key={index}>{ext}</div>
              ))}
            </div>
          </div>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>PROGRAM</div>
            <div className={styles.sideContentDetail__program}>
              {data.extension.map((ext, index) => (
                <div key={index} className={styles.extensionItem}>
                  <img
                    src={`/images/explore/${ext}.png`}
                    alt={`${ext} icon`}
                    className={styles.extensionIcon}
                  />
                  <span className={styles.extensionLabel}>{ext}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.sideItem}>
            <div className={styles.sideTitle}>ETC</div>
            <div className={styles.sideContentDetail}>
              {data.isAnimated === 1 ? "Animated" : ""}
            </div>
          </div>
        </div>
      </div>
      {isPayModalOpen && (
        <PayModal
          onClose={closePayModal}
          amount={data.price}
          onSuccess={handlePaymentSuccess}
        />
      )}
      {isLoginModalOpen && <LoginModal onClose={closeLoginModal} />}
    </div>
  );
}
