import React,{Component} from 'react';
import Axios from 'axios';
import {AppContext} from './Context';


import {
    Link,
    Redirect
  } from "react-router-dom";

export default class Register extends Component{
    static contextType = AppContext;   

    state = {
        isRegistered:false
    }
    
    insertUser = (event) => {
        event.preventDefault();
        event.persist();
        Axios.post('http://localhost/api/register.php',{
            user_name:this.username.value,
            user_email:this.useremail.value,
            password:this.password.value
        })
        .then(function ({data}) {
            if(data.success === 1){
                
                this.setState({isRegistered:true})
                event.target.reset();
                alert(data.msg);
            }
            else{
                alert(data.msg);
            }
        }.bind(this))
        .catch(function (error) {
        console.log(error);
        });

    }

    render(){
        if(this.state.isRegistered){
            return <Redirect to={{
                pathname: "/acceuil",
                state: { isLogged: this.state.isLogged }
            }}/>
        }
        else{
            return(
                <div className="container" style={{  marginRight:-90,  marginTop:80}}>
                    <div>
                        <h1 className="">Register</h1>
                    </div>
                    <form onSubmit={this.insertUser}>
                    {/* <div className="form-row"> */}
                        <div className="form-group col-sm-6">
                            <label className="font-weight-bold">Name</label>
                            <input type="text" name="username" ref={(val) => this.username = val} className="form-control" placeholder="Name"/>
                        </div>
                        <div className="form-group col-sm-6">
                            <label className="font-weight-bold">Email</label>
                            <input type="email" name="useremail" ref={(val) => this.useremail = val} className="form-control" placeholder="Email"/>
                        </div>
                        <div className="form-group col-sm-6">
                            <label className="font-weight-bold">Password</label>
                            <input type="password" name="password" ref={(val) => this.password = val} className="form-control" placeholder="Password"/>
                        </div>
                        <div className="form-group col-sm-12 ">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <Link  to={"/"}><div style={{marginLeft:30}}>Already have an account? Login</div></Link>
                        </div>
                    {/* </div> */}
                </form>    
            </div>    
            );
        }
        
    }
}