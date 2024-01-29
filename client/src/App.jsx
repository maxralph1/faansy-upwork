import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { route } from '@/routes';
import PrivateRoute from '@/utils/PrivateRoute.jsx';
import Index from '@/views/public/Index.jsx';
import CreateAccount from '@/views/public/CreateAccount.jsx';
import Home from '@/views/private/Index.jsx';
// import './App.css'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route element={<Index />} path={ route('index') } />
          <Route element={<CreateAccount/>} path={ route('create-account') } />

          {/* Protected routes */}
          <Route element={<PrivateRoute/>} path='/' >
            <Route element={<Home/>} path={ route('home') } />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
