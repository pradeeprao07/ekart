import { useSelector, useDispatch } from 'react-redux';
import Header from "./Header";
import { Button } from 'antd';
import { RxPlusCircled, RxMinusCircled } from "react-icons/rx";
import { removeCartItem, updateCartItem } from './Store';
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.shopCartItem.items); // selecting the cart items from the store
    const dispatch = useDispatch();

    const Increment = (id, count, price) => {
        const newCount = count + 1;
        const newTotalCost = newCount * price;
        dispatch(updateCartItem({ id, count: newCount, totalCost: newTotalCost })); // updating / replacing the new values on the store
    };

    const Decrement = (id, count, price) => {
        if (count > 1) {
            const newCount = count - 1;
            const newTotalCost = newCount * price;
            dispatch(updateCartItem({ id, count: newCount, totalCost: newTotalCost }));
        }
    };

    const removeItemFromCart = (removeId) => {
        dispatch(removeCartItem(removeId)); // this id will be updated on removeCartItem of the store
    };

    const moveCartToPay = () => {
        const totalOfAllItem = cartItems.reduce((sum, item) => sum + (item.totalCost || 0), 0) // sum stores the total of all item and being added among itself (initial value of sum will be 0)
        navigate("/payment", { state: { totalOfAllItem } }); // and the total price of all the items will be sent to payment page on navigate
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
                                <img src={item.thumbnail} />
                                <h3 className="itemName">{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <p>Total Price: ₹{item.totalCost}</p>
                                <div className="add-item-section">
                                    <RxPlusCircled className="btn" onClick={() => Increment(item.id, item.count, item.price)} />
                                    <div className="countNumber"> {item.count} </div>
                                    <RxMinusCircled className="btn" onClick={() => Decrement(item.id, item.count, item.price)} />
                                </div>
                                <Button className='removeBtn' type="primary" onClick={() => removeItemFromCart(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                        <p className='totalPrice'>Total amount - ₹{cartItems.reduce((sum, item) =>
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
