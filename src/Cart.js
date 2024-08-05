import { useSelector } from 'react-redux';

export default function Cart() {
    const cartItems = useSelector((state) => state.cart.items);

    return (
        <div>
            <h3>Cart</h3>
            {cartItems.map((item, index) => (
                <div key={index}>
                    <img src={item.image} />
                    <h4>{item.name}</h4>
                    <p>Price: ${item.cost}</p>  
                </div>
            ))}
        </div>
    );
}
