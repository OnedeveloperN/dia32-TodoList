import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext'; 

import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { NewTask } from './pages/NewTask';
import { EditTask } from './pages/EditTask';
import { TaskDetail } from './pages/TaskDetail';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-task" element={<NewTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/task/:id" element={<TaskDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;