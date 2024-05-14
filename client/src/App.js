import {Routes,route, Route} from 'react-router-dom';
import About from "./pages/AboutPage";
import Contact from "./pages/Contacts";
import HomePage from "./pages/HomePage";
import Policy from "./pages/Policies";
import PageNotFound from "./pages/PageNotFound";
import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from "./components/Routes/Priavte"
import ForgotPasssword from './pages/Auth/ForgotPassword';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminRoute from "./components/Routes/AdminRoute"
import CreateCategory from './pages/Admin/CreateCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Orders from './pages/user/Orders';
import Profile from './pages/user/Profile';
import Products from './pages/Admin/Product';
import UpdateProduct from './pages/Admin/UpdateProduct';
import Search from './pages/Search';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/categories';
import CategoryProduct from './pages/categoryProduct';
import CartPage from './pages/cartPage';
import AdminOrders from "./pages/Admin/AdminOrders";
function App() {
  return (
    <>
   
   <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:slug" element={<ProductDetails/>} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/category/:slug" element={<CategoryProduct />} />
        <Route path="/search" element={<Search />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          
      
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Products/>} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
      <Route path = "/register" element ={<RegisterPage/>}/>
      <Route path = "/login" element ={<LoginPage/>}/>
      <Route path="/forgot-password" element={<ForgotPasssword />} />
      <Route path = "/about" element ={<About/>}/>
      <Route path = "/contact" element ={<Contact/>}/>
      <Route path = "/policy" element ={<Policy/>}/>
      <Route path = "*" element ={<PageNotFound/>}/>
   </Routes>

    
</>

  );
}
export default App;
