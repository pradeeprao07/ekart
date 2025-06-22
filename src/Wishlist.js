import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { Button } from "antd";
import { removeWishlistItem, cartItem } from "./Store";

export default function Wishlist() {
    const dispatch = useDispatch();
    const wishlistItems = useSelector((state) => state.shopWishlistItem.items);

    const removeItemFromWishlist = (id) => {
        dispatch(removeWishlistItem(id)); // this id will be replace on removeWishlistItem of store
    };

    const moveToCart = (item) => {
        dispatch(cartItem({ ...item })); // item will 'spread' from wishlist to cart page 
        dispatch(removeWishlistItem(item.id)) // at the same time of 'spread', the item should be removed
    };

    return (
        <div className="wishlist-container">
            <Header />
            {wishlistItems.length > 0 ? (
                <div>
                    <h3 className="wishlistText">Wishlist</h3>
                    <div className="wishlist-section">
                        {wishlistItems.map((item) => (
                            <div key={item.id} className="wishlistItems">
                                <img src={item.thumbnail} />
                                <h3 className="itemName">{item.name}</h3>
                                <p>Price: ₹{item.price}</p>
                                <div className="wishlist-buttons">
                                    <Button type="primary" className="wishlistToCartBtn" onClick={() => moveToCart(item)}>
                                        Move to Cart
                                    </Button>
                                    <Button type="primary" className="removeBtn" onClick={() => removeItemFromWishlist(item.id)}>
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <h3 className="wishlistText">Your wishlist is empty</h3>
            )}
        </div>
    );
}
