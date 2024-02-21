import React from 'react'
import TodoList from './components/TodoList';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';
import './App.css'

function App() {
  return (
    <div className='canvas'>
      <Typography variant="h2" gutterBottom className='title'>
       DAILY SCRIPT
      </Typography>
      <Typography variant="h6" gutterBottom className='sub-head'>
        What needs to be done today?
      </Typography>
      <TodoList>
        
      </TodoList>

    </div>
  )
}

export default App;