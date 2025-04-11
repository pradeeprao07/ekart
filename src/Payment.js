import { useState } from "react";
import Header from "./Header";
import { Radio, Button, Input, Modal } from 'antd';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function Payment() {
    const [cardNo, setCardNo] = useState("");
    const [validTillValue, setValidTillValue] = useState("")
    const [cvvValue, setCvvValue] = useState("")
    const [selectUpi, setSelectUpi] = useState(null);
    const [selectBank, setSelectBank] = useState(null);
    const [togglePay, setTogglePay] = useState(false);

    const location = useLocation();
    const totalOfAllItem = location.state?.totalOfAllItem || 0;
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.shopCartItem.items);

    const handleCardNumber = (e) => {
        let newBankValue = e.target.value.replace(/\D/g, '').slice(0, 16)
        newBankValue = newBankValue.replace(/(\d{4})/g, "$1 ").trim()
        setCardNo(newBankValue)
    }

    const handleValidTill = (e) => {
        let newValidTillValue = e.target.value.replace(/[^0-9]/g, "");
        if (newValidTillValue.length > 4) return;
        if (newValidTillValue.length >= 2) {
            newValidTillValue = newValidTillValue.slice(0, 2) + "/" + newValidTillValue.slice(2);
        }
        setValidTillValue(newValidTillValue);
    }

    const handleCvv = (e) => {
        let newCvvValue = e.target.value.replace(/\D/g, '').slice(0, 3);
        setCvvValue(newCvvValue)
    }

    const handlePayButton = () => {
        if (!cardNo.trim() && !selectUpi && !selectBank) {
            toast.error("Please enter the card details or enter the payment method");
            return;
        }
        setTogglePay(true)
    }

    const handleProceedButton = () => {
        setTogglePay(true)
    }

    const handleLogOut = async () => {
        try {
            await signOut(auth);
            console.log("Successfully logged out")
            navigate('/')
        } catch (error) {
            console.log("Failed to logout: ", error)
        }
    }

    return (
        <div className="payment-container">
            <Header />
            <h3 className="paymentText">Please choose the payment method : Your total amount is ₹{totalOfAllItem}</h3>
            <div className="payment-section">
                <div className="row1">
                    <div className="box">
                        <h3>Credit / Debit / Atm card</h3>
                        <p style={{ marginTop: "-2px" }}>Card number</p>
                        <Input
                            type="text"
                            placeholder="XXXX XXXX XXXX XXXX"
                            style={{ width: 265, height: 30 }}
                            value={cardNo}
                            onChange={handleCardNumber}
                        />
                        <div className="alignInsideCard">
                            <p>Valid till</p>
                            <Input
                                placeholder="MM / YY"
                                style={{ width: 80, height: 30, margin: 10 }}
                                value={validTillValue}
                                onChange={handleValidTill}
                            />
                            <p>CVV</p>
                            <Input
                                placeholder="CVV"
                                style={{ width: 80, height: 30, margin: 10 }}
                                value={cvvValue}
                                onChange={handleCvv}
                            />
                        </div>
                        <Button onClick={handlePayButton} className="bankPayBtn" type="primary">Pay</Button>
                    </div>
                    <div className="box">
                        <h3>Net Banking</h3>
                        <Radio.Group
                            onChange={(e) => setSelectBank(e.target.value)}
                            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
                            options={[
                                { value: 1, label: 'HDFC Bank' },
                                { value: 2, label: 'Axis Bank' },
                                { value: 3, label: 'SBI Bank' },
                            ]}
                        />
                        <Button onClick={handlePayButton} className="bankPayBtn" type="primary">Pay</Button>
                    </div>
                </div>
                <div className="row2">
                    <div className="box">
                        <h3>UPI</h3>
                        <Radio.Group
                            onChange={(e) => setSelectUpi(e.target.value)}
                            style={{ display: "flex", flexDirection: "Column", gap: 8 }}
                            options={[
                                { value: 1, label: 'Google Pay' },
                                { value: 2, label: 'Phone Pay' },
                                { value: 3, label: 'Amazon Pay' },
                            ]}
                        />
                        <Button onClick={handlePayButton} className="bankPayBtn" type="primary">Pay</Button>
                    </div>
                    <div className="box">
                        <p>Pay in online to avoid cashless delivery</p>
                        <Button onClick={handleProceedButton} className="bankPayBtn" type="primary">Proceed</Button>
                    </div>
                </div>
                <Button type="primary" className="logOutBtn" onClick={handleLogOut}>Log out</Button>
            </div>
            <Modal open={togglePay} onOk={() => setTogglePay(false)} onCancel={() => setTogglePay(false)}>
                <p>Congratulations! your order has been placed</p>
            </Modal>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    )
}