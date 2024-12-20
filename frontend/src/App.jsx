import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import ChatPage from './pages/ChatPage';
import userAtom from './atoms/userAtom';
import { useRecoilValue } from 'recoil';

function App() {
  const currentUser = useRecoilValue(userAtom);

  return (
    <>
      <Router>
        <Routes>
          {/* If currentUser exists, redirect Signup and Signin to /chat */}
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/chat" /> : <Signup />}
          />
          <Route
            path="/signin"
            element={currentUser ? <Navigate to="/chat" /> : <Signin />}
          />

          {/* If currentUser does not exist, redirect ChatPage to /signin */}
          <Route
            path="/chat"
            element={currentUser ? <ChatPage /> : <Navigate to="/signin" />}
          />

          {/* Fallback route to handle unknown paths */}
          <Route
            path="*"
            element={<Navigate to={currentUser ? "/chat" : "/signin"} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
