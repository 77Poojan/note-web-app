import './App.css';
import Header from './components/Header'
import NotesListPage from './pages/NotesListPage'
import NotePage from './pages/NotePage'
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route exact path="/" element={ <NotesListPage/> } />
            <Route path="/notes" element={ <NotesListPage/> } />
            <Route path="/note/:noteId" element={ <NotePage/> } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
