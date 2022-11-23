import Home from './components/Home';
import SignIn from './components/SignIn';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Artist from './components/Artist';
import UserProfile from './components/UserProfile';
import Songbar from './components/Songbar';
import {Routes,Route,Navigate} from 'react-router-dom';
import {getItemFromLocalStorage,TokenKey} from './utils'

function PrivateRoute({children,...rest}){
  
  const item = getItemFromLocalStorage(TokenKey)
  return item ? children : <Navigate to="/signin" replace/>;

}

function Page404(){
  return(
    <div className='mt-5 d-flex justify-content-center'>
      <h1>Page not found !!</h1>
    </div>
  )
}

function App() {


  return (
    <div id="App">
    
    <NavBar />
    <Routes>
      <Route exact path='/' element={<PrivateRoute><Home /></PrivateRoute>}>

      </Route>
      <Route exact path='/artist/:name' element={<PrivateRoute><Artist /></PrivateRoute>}>

      </Route>
      <Route exact path='/user' element={<PrivateRoute><UserProfile /></PrivateRoute>}>

      </Route>
      <Route exact path='/signin' element={<SignIn />}>

      </Route>
      <Route exact path='/signup' element={<SignUp />}>

      </Route>
      
      <Route exact path='*' element={<Page404 />}>

      </Route>
    </Routes>
    <Songbar />
    </div>
  );
}

export default App;
