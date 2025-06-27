import { useState } from 'react'
import './App.css'
import Query from './components/Query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {

  
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <h1>HOLA</h1>
        <Query />
        <ReactQueryDevtools initialIsOpen />
      </QueryClientProvider>
          
    </>
  )
}

export default App
