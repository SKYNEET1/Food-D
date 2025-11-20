import './App.css'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Signin from './components/Signin'
import ForgotPassword from './components/ForgotPassword'
export const serverURL = "http://localhost:3000"

function App() {

  return (
    <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
    </Routes>
  )
}

export default App
