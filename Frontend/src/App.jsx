import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './Components/Products'
import Login from './Components/Login'
import History from './Components/History'
import Reset from './Components/Reset'
import { Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
  
  const queryClient = new QueryClient();
  return (
    
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/history" element={<History />} />
      <Route path="/reset" element={<Reset />} />
    </Routes>
    </QueryClientProvider>
    
    
  )
}

export default App
