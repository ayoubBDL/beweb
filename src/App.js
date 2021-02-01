import React,{Component} from 'react';
import UsersList from './components/UsersList';
import Register from './components/Register';
import Login from './components/Login';
import Acceuil from './components/Acceuil';
import {Provider} from './components/Context';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends Component {
    
    
    render(){
        
        return (
          <Router>
            <Switch>
                <Route path="/" exact component = {Login} />
                <Route path="/register" component = {Register} />
                <Route path="/Acceuil" render={(props) => <Acceuil {...props}/>} />
            </Switch>
          </Router>
        );
    }
}
export default App;