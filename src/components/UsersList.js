import React, {Component} from 'react';
import Axios from 'axios';
import {AppContext} from './Context';
class UsersList extends Component{
    static contextType = AppContext;   
    
    state = {
        users:[]
    }
    
    fetchUsers = () => {
        fetch('http://localhost/api/all-users.php')
        .then(response => {
            response.json().then(function(data) {
                if(data.success === 1){
                    this.setState({
                        users:data.users.reverse()
                    });
                } 
                else{
                    this.context.post_show(false);
                }               
            }.bind(this));
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidMount(){
        this.fetchUsers();
        console.log(this.context)
    }

    handleUpdate = (id) => {
        Axios.post('http://localhost/api/update-user.php',
        {
            id:id,
            name:this.name.value,
            email:this.email.value
        })
        .then(({data}) => {
            if(data.success === 1){
                let users = this.state.users.map(user => {
                    if(user.id === id){
                        user.name = this.name.value;
                        user.email = this.email.value;
                        user.isEditing = false;
                        return user;
                    }
                    return user; 
                });
                this.setState({
                    users
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    
    editMode = (id) => {
        let users = this.state.users.map(user => {
            if(user.id === id){
                user.isEditing = true;
                return user;
            }
            user.isEditing = false;
            return user;
            
        });

        this.setState({
            users
        });
       
    }

    cancleEdit = (id) => {
        let users = this.state.users.map(user => {
            if(user.id === id){
                user.isEditing = false;
                return user;
            }
            return user
            
        });
        this.setState({
            users
        });
    }

    handleDelete = (id) => {
        let deleteUser = this.state.users.filter(user => {
            return user.id !== id;
        });
        
        Axios.post('http://localhost/api/delete-user.php',{
            id:id
        })
        .then(({data}) => {
            if(data.success === 1){
                this.setState({
                    users:deleteUser
                });
            }
            else{
                alert(data.msg);
            }
        })
        .catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate(){
        let newUser = this.context.new_user;
        if(newUser){ 
            this.setState({
                users:[
                    newUser,
                    ...this.state.users
                    
                ]
            });          
            this.context.new_user = false;
        }        
    }

    render(){

        let allUsers = this.state.users.map(({id,name,email,isEditing}, index) => {
            
            return isEditing === true ? (   
            <tr key={id}>
                <td><input className="form-control" type="text" ref={(item) => this.name = item} defaultValue={name}/></td>
                <td><input className="form-control" type="email" ref={(item) => this.email = item} defaultValue={email}/></td>
                <td>
                    <button className="btn btn-success mr-2" onClick={() => this.handleUpdate(id)}>Save</button>
                    <button onClick={() => this.cancleEdit(id)} className="btn btn-light">Cancel</button>
                </td>
            </tr>
            ):
            ( 
                <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>
                        <button className="btn btn-dark mr-2" onClick={() => this.editMode(id)}>Edit</button>
                        <button onClick={() => this.handleDelete(id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            );
        });

        

        return(
            <>
            {allUsers}
            </>
        );
        
    }
}

export default UsersList;
