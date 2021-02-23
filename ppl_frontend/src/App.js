import logo from './logo.svg';
import './App.css';
import NavBar from './Components/Common/NavBar';
import { BrowserRouter as Router,Switch, Route } from 'react-router-dom';
import Timeline from './Components/Timeline/TimeLine'
import Footer from './Components/Common/Footer'
import LoginRegister from './Components/LoginRegister/LoginRegister'
import SinglePost from './Components/Timeline/SinglePost/SinglePost'
function App() {
  return (
    <>
          <Router>
          <NavBar/>
          <div className="container">
          <div className="content">
          <Switch>
            <Route path ='/singlepost' component={SinglePost} />
            <Route path='/timeline' component={Timeline}/>
            <Route path='/' component={LoginRegister}/>
          </Switch>
          </div>
          </div>
          <Footer />
        </Router>
      </>
      );
}

export default App;
