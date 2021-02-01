import React,{Component} from 'react';
import Axios from 'axios';
import {AppContext} from './Context';
import {Consumer} from './Context';

import {
    Link,
    Redirect
  } from "react-router-dom";

export default class Login extends Component{
    static contextType = AppContext;  

    state = {
        isLogged:false
    }
    
    logUser = (event) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/api/login.php',{
            name:this.username.value,
            password:this.password.value
        })
        .then(function ({data}) {
            if(data.success === 1){
                console.log("login successful", data)
                this.setState({isLogged:true})
                event.target.reset();
            }
            else{
                alert(data.msg);
                console.log("login nooooooot successful", data.msg)
            }
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });

        

    }

    render(){
        if(this.state.isLogged){
            return <Redirect to={{
                pathname: "/acceuil",
                state: { isLogged: this.state.isLogged }
            }}/>
        }else{
            return(
                
                <div className="container" style={{  marginRight:-100, marginTop:80}}>
                    <div>
                        <h1 className="">Login</h1>
                    </div>
                    <form  style={{justifyContent:'center', width: '50rem',  marginRight:1000}} onSubmit={this.logUser}>
                    {/* <div className="form-row"> */}
                        <div className="form-group col-sm-6">
                            <label className="font-weight-bold">Name</label>
                            <input type="text" name="username" ref={(val) => this.username = val} className="form-control" placeholder="Name"/>
                        </div>
                        <div className="form-group col-sm-6">
                            <label className="font-weight-bold">Password</label>
                            <input type="password" name="password" ref={(val) => this.password = val} className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group col-sm-12 mr-10" >
                            
                        <button type="submit" className="btn btn-primary">Login</button>
                            <Link  to={"/register"}><div style={{marginLeft:30}}>You don't have an account? Register</div></Link>
                            
                        
                        </div>
                        
                    {/* </div> */}
                </form>        
                </div>
                // <Consumer >
                // {(context)=>(
                //     <React.Fragment>
                //         <button type="submit" className="btn btn-primary">Login</button>
                //     </React.Fragment>
                // )}
            );
        }
        
    }
}