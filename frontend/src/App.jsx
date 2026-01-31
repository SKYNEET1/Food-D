import './App.css'
import Signup from './components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import ForgotPassword from './components/ForgotPassword'
import Home from './components/Home'
import useGetCurrentUserHook from './hooks/useGetCurrentUserHook'
import { useSelector } from 'react-redux'
import useGetCurrentcityHook from './hooks/useGetCurrentCityHook'
import OwnerDashbord from './components/HomeFeatures/OwnerDashbord'
import useGetMyShopHook from './hooks/useGetMyShopHook'
import CreateEditShop from './components/ShopFeatures/CreateEditShop'
import AddItem from './components/ItemComponent/AddItem'
import EditItem from './components/ItemComponent/EditItem'
import  Loading  from './components/Ui.shadecn/Loading'
export const serverURL = "http://localhost:4000"

function App() {
  useGetCurrentUserHook();
  useGetCurrentcityHook();
  useGetMyShopHook();
  const { userData, loading } = useSelector(state => state.user);

  if (loading) {
    return <Loading />;
  }

  // const { myShopData } = useSelector(state => state.owner);
  console.log('app.js userdata', userData);
  return (
    <Routes>
      <Route path='/' element={userData ? <Home /> : <Signin />} />
      <Route path='/signup' element={userData ? <Navigate to={"/"} /> : <Signup />} />
      <Route path='/signin' element={userData ? <Navigate to={"/"} /> : <Signin />} />
      <Route path='/forgot-password' element={userData ? <Navigate to={"/"} /> : <ForgotPassword />} />
      <Route path='/owner-dashbord' element={<OwnerDashbord />} />
      <Route path='/create-edit-Shop' element={<CreateEditShop />} />
      <Route path='/addItem' element={<AddItem />} />
      <Route path='/edit-item/:itemId' element={<EditItem />} />
    </Routes>
  )
}

export default App;
