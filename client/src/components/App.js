import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyle from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Shipping from "./Shipping";
import Messaging from "./Messaging";
import Friends from "./Friends";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Header/>
        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/shipping' element={<Shipping/>} />
          <Route path='/messaging' element={<Messaging/>} />
          <Route path='/friends' element={<Friends/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
