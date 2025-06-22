import { MobileItems } from "./Items";
import Calculation from "./Calculation";
import Header from "./Header";

export default function Mobile() {
    return (
        <div className="shopping-container">
            <Header />
            <div className="shopping-content">
                <div className="digital-item">
                    {MobileItems.map((item) => (
                        // id, thumbnail, name and price because of dynamic content (differs for each item)
                        <Calculation
                            id={item.id}
                            thumbnail={item.thumbnail}
                            name={item.name}
                            price={item.price}    
                        />
                    ))}
                </div>
            </div>
            <div className="footer">
                <p>Happy Shopping</p>
            </div>
        </div>
    );
}
