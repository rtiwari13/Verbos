
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import Todo from "./pages/Todo"
import Docs from "./pages/Docs"
import Note from './pages/Note';
import DocumentEditor from './pages/DocumentEditor';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/todo" element={<Todo />}/>
        <Route path="/docs" element={<Docs />}/>
        <Route path="/notes" element={<Note />}/>
        <Route path="/docs/:id" element={<DocumentEditor />}/>

      </Routes>
    </Router>
  );
}

export default App
