import { useSelector, useDispatch } from 'react-redux';
import Header from "./Header";
import { Button } from 'antd';
import { RxPlusCircled, RxMinusCircled } from "react-icons/rx";
import { removeCartItem, updateCartItem } from './Store';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.shopCartItem.items);
    const dispatch = useDispatch();

    const Increment = (id, count, cost) => {
        const newCount = count + 1;
        const newTotalCost = newCount * cost;
        dispatch(updateCartItem({ id, count: newCount, totalCost: newTotalCost }));
    };

    const Decrement = (id, count, cost) => {
        if (count > 1) {
            const newCount = count - 1;
            const newTotalCost = newCount * cost;
            dispatch(updateCartItem({ id, count: newCount, totalCost: newTotalCost }));
        }
    };

    const removeItemFromCart = (removeId) => {
        dispatch(removeCartItem(removeId));
    };

    const moveCartToPay = () => {
        const totalOfAllItem = cartItems.reduce((sum, item) => sum + (item.totalCost || 0), 0)
        navigate("/payment", { state: { totalOfAllItem } });
    };

    return (
        <div className="cart-container">
            <Header />
            {cartItems.length > 0 ? (
                <div>
                    <h3 className='cartText'>Shopping Cart</h3>
                    <div className='cart-section'>
                        {cartItems.map((item) => (
                            <div key={item.id} className='cartItems'>
                                <img src={item.image} alt={item.name} />
                                <h3>{item.name}</h3>
                                <p>Price: ₹{item.cost}</p>
                                <p>Total Price: ₹{item.totalCost}</p>
                                <div className="add-item-section">
                                    <RxPlusCircled className="btn" onClick={() => Increment(item.id, item.count, item.cost)} />
                                    <div className="countNumber"> {item.count} </div>
                                    <RxMinusCircled className="btn" onClick={() => Decrement(item.id, item.count, item.cost)} />
                                </div>
                                <Button className='removeBtn' type="primary" onClick={() => removeItemFromCart(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <p className='totalPrice'>Total amount: ₹{cartItems.reduce((sum, item) =>
                            sum + (item.totalCost || 0), 0)}</p>
                        <Button className='proceedToCheckoutBtn' type="primary" onClick={moveCartToPay}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </div>
            ) : (
                <h3 className='cartText'>Your shopping cart is empty</h3>
            )}
        </div>
    );
}
