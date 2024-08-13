import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import Home from '../pages/Home/Home/Home';
import About from '../pages/About/About/About';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Secret from '../pages/Shared/Secret/Secret';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from '../Layout/Dashboard';
import MyAppointment from '../pages/Dashboard/UserHome/MyAppointment';
import MyTestResults from '../pages/Dashboard/UserHome/MyTestResults';
import Profile from '../pages/Dashboard/UserHome/Profile';
import AllUsers from '../pages/Dashboard/AdminHome/AllUsers';
import AddTest from '../pages/Dashboard/AdminHome/AddTest';
import AllTestManage from '../pages/Dashboard/AdminHome/AllTestManage';
import AdminProfile from '../pages/Dashboard/AdminHome/AdminProfile';
import AllBanners from '../pages/Dashboard/AdminHome/AllBanners';
import AddBanner from '../pages/Dashboard/AdminHome/AddBanner';
import UpdateBanner from '../pages/Dashboard/AdminHome/UpdateBanner';
import AllProducts from '../pages/AllProducts/AllProducts/AllProducts';
import SingleProduct from '../pages/SingleProduct/SingleProduct/SingleProduct';
import Cart from '../pages/Order/Cart/Cart';
import Checkout from '../pages/Order/Checkout/Checkout';
import Ordered from '../pages/Order/Ordered/Ordered';
import Wishlist from '../pages/Order/Wishlist/Wishlist';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/AllProducts', element: <AllProducts /> },
      { path: '/About', element: <About /> },
      { path: '/Login', element: <Login /> },
      { path: '/Register', element: <Register /> },
      { path: '/Product/:id', element: <SingleProduct /> },
      { path: '/Cart', element: <Cart /> },
      { path: '/Checkout', element: <Checkout /> },
      { path: '/Ordered', element: <Ordered /> },
      { path: '/Wishlist', element: <Wishlist /> },
      {
        path: '/Secret',
        element: (
          <PrivateRoutes>
            <Secret />
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/Dashboard',
    element: (
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      { path: 'Profile', element: <Profile /> },
      { path: 'AdminProfile', element: <AdminProfile /> },
      { path: 'MyAppointment', element: <MyAppointment /> },
      { path: 'MyTestResults', element: <MyTestResults /> },
      { path: 'AllUsers', element: <AllUsers /> },
      { path: 'AddTest', element: <AddTest /> },
      { path: 'AllTestManage', element: <AllTestManage /> },
      { path: 'AddBanner', element: <AddBanner /> },
      { path: 'UpdateBanner', element: <UpdateBanner /> },
      { path: 'AllBanners', element: <AllBanners /> },
    ],
  },
]);
