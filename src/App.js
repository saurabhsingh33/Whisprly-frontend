import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SocketProvider } from '../src/context/socketProvider';
import ChatPage from './pages/chatPage';
import Register from './pages/register';
import Login from './pages/login';
import SetAvatar from './pages/setAvatar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/" element={<SocketProvider>
          <ChatPage />
        </SocketProvider>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
