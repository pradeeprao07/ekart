import { useSelector, useDispatch } from 'react-redux';
import Header from "./Header";
import { Button } from 'antd';
import { cartItem, removeWishlistItem } from './Store';
import { useState } from 'react';

export default function Wishlist() {
    const dispatch = useDispatch();
    const [toggle, setToggle] = useState(false);

    const wishlistItems = useSelector((state) => state.shopWishlistItem.items);

    const removeItemFromWishlist = (removeId) => {
        dispatch(removeWishlistItem(removeId));
    };

    const moveWishlistItemToCart = (item) => {
        dispatch(cartItem({ id: item.id, image: item.image, name: item.name, cost: item.cost, totalCost: item.totalCost, count: item.count }));
        dispatch(removeWishlistItem(item.id))
        setToggle(true)
    }

    return (
        <div className="cart-container">
            <Header />
            {wishlistItems.length > 0 ? (
                <div className='display-shopping-items'>
                    <h3 className='wishlistText'>Wishlist</h3>
                    <div className='wishlist-section'>
                        {wishlistItems.map((item, index) => (
                            <div key={index} className='wishlistItems'>
                                <img src={item.image} />
                                <h3>{item.name}</h3>
                                <p>Price: ${item.cost}</p>
                                <Button className='wishlistToCartBtn' type="primary" onClick={() => moveWishlistItemToCart(item)}>
                                    Move to cart
                                </Button>
                                <Button className='removeBtn' type="primary" onClick={() => removeItemFromWishlist(item.id)}>
                                    Remove
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h3 className='wishlistText'>Your wishlist is empty</h3>
            )}
        </div>
    );
}
