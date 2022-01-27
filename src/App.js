import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Loginform from './Components/LoginForm';
import Loginnav from './Components/LoginNav';
import Dashboardnav from './Components/DashBoardNav';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Signup from './Components/Signup';
import Menu from './Components/Menu';
import Order from './Components/Order'


function App() {
  return (
    <div className="container">

      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/loginform" element={<Loginform/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="order" element={<Order/>}/>
          
          
          
        </Routes>
      </Router>
      {/* <Login/>
      <Loginnav/>
      <Loginform/>
      <Dashboardnav/>
      <Cart/>
      <Checkout/> */}
    </div>
  );
}

export default App;
