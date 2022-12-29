import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Header from "./components/header";
import Dashboard from "./pages/dashboard";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Subscriptions from "./pages/subscriptions";
import { AppProvider } from './context/appContext';

function App() {
  return (
    <BrowserRouter>
    <AppProvider>
    <GoogleOAuthProvider 
    clientId={process.env.REACT_APP_GCID}>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/subscriptions" element={<Subscriptions/>} />
      <Route path="/dashboard" element={<Dashboard/>} />
    </Routes>
    </GoogleOAuthProvider>
    </AppProvider>
    </BrowserRouter>
  );
}

export default App;
