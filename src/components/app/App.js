import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ProductView from '../product-view/ProductView';


import ProductsList from "../products-list/ProductsList";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<ProductsList />} />
                <Route path="/products/:productId" element={<ProductView />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;