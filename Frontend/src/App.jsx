import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Products from './Components/Products'
import Login from './Components/Login'
import { Routes, Route } from 'react-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
function App() {
  
  const queryClient = new QueryClient();
  return (
    
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/login" element={<Login />} />
    </Routes>
    </QueryClientProvider>
    
    
  )
}

export default App
