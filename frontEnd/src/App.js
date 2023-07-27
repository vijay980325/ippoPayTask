// import logo from './logo.svg';
// import './App.css';
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './component/Home';
import SignupForm from './component/SignupForm';
import { RouterProvider } from 'react-router-dom';

function App() {
  const routes= createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" >
        <Route index element={<SignupForm />} />
        <Route  path="/home" element={<Home />} /> 
      </Route>
    )
  )
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
