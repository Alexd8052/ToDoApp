import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

//component imports
import Navigation from './components/Navigation'
import Categories from './components/Categories/Categories'
import Login from './components/Auth/Login'
import NotFound from './components/NotFound'
import AuthProvider from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import Todos from './components/ToDos/Todos'
import Welcome from './components/Welcome'

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navigation />
          <Routes>
            <Route path='/' element={<Welcome/>} />
            <Route path='/todos' element={<ProtectedRoute><Todos /></ProtectedRoute>} />
            <Route path='/categories' element={<ProtectedRoute><Categories /></ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App;
