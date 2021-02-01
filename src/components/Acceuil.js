import React,{Component} from 'react';
import UsersList from './UsersList';
import { Redirect } from "react-router-dom";
import {Provider} from './Context';


class Acceuil extends Component {
    state = {
        post_found:true,
        new_user:false,
        isLogged:false
    }

    componentWillMount(props){
        // console.log("data",this.props.location.state.isLogged)
        this.setState({isLogged:this.props.location.state.isLogged})
    }
    addNewUser = (id,name,email) => {
        if(this.state.post_found){
            this.setState({
                new_user:{id:id,user_name:name,user_email:email}
            });
        }
        else{
            this.setState({
                post_found:true
            });
        }
        
    }

    loginUser = () => {
        if(this.state.post_found){
            this.setState({
                isLogged:true
            });
        }
        else{
            this.setState({
                post_found:true
            });
        }
        
    }

    logoutUser = ()=>{
        this.setState({
            isLogged:false
        })
    }

    postShow = (show) => {
        this.setState({
            post_found:show
        })
    }

    
    render(){
        const contextValue = {
            new_user:this.state.new_user,
            addNewUser:this.addNewUser,
            loginUser:this.loginUser,
            logoutUser:this.logoutUser,
            post_show:this.postShow
        }

        
        let showUsers;
        if(this.state.post_found && this.state.isLogged){
            showUsers = (
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <UsersList/>
                    </tbody>
                </table>
            );
        }
        else if(!this.state.post_found && this.state.isLogged){
            showUsers = (
                <div className="alert alert-light" role="alert">
                    <h4 className="alert-heading">No User Found!</h4>
                    <hr/>
                    <p>Please Insert Some Users.</p>
                </div>
            );
        }else if(this.state.post_found && !this.state.isLogged){
            return <Redirect to={"/"}/>
        }
        return (
            <Provider value={contextValue}>
            <div className="container-fluid bg-light">
            <div className="container p-5">
                <div className="card shadow-sm">
                    <div className="card-header text-center text-uppercase text-muted">
                    <h1 className="text-center text-uppercase text-muted">Beweb Test Technique</h1>
                    <button onClick={this.logoutUser} className="btn btn-danger btn-lg pull-right">Logout</button>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                {showUsers}
                            </div>
                        </div>
                    </div>
                </div>
    
            </div>
            </div>
        </Provider>
        );
    }
}
export default Acceuil;