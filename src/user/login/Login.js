import React, { Component } from 'react';
import { login } from '../../util/APIUtils';
import './Login.css';
import { Link } from 'react-router-dom';
import { ACCESS_TOKEN } from '../../constants';

import { Form, Input, Button, Icon, notification } from 'antd';
const FormItem = Form.Item;

class Login extends Component {
    render() {
        const AntWrappedLoginForm = Form.create()(LoginForm)
        return (
            <div className="login-container">
                <h1 className="page-title">Se connecter</h1>
                <div className="login-content">
                    <AntWrappedLoginForm onLogin={this.props.onLogin} />
                </div>
            </div>
        );
    }
}

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();   
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const loginRequest = Object.assign({}, values);
                login(loginRequest)
                .then(response => {
                    console.log(response);
                    if(response.status === 200){
                       

                        response.json().then((responsejson) => {
                        
                            localStorage.setItem(ACCESS_TOKEN, responsejson.access_token); 
                            this.props.onLogin(1);
                            console.log(" Sucessful!");
                                           
                        })
                   
                    }
                    else{
                        this.props.onLogin(0);
                        console.log("error login")

                    }
                    
                }).catch(error => {
                    if(error.status === 400) {
                        this.props.onLogin(0);
                        console.log("error login")
            
                        // notification.error({
                
                        //     message: 'DXC Technology',
                        //     description: 'votr Email ou Password est incorrect. Please try again!'
                        // });    
                    } else {
                        notification.error({
                            message: 'DXC Technology',
                            description: error.message || 'Sorry! Something went wrong. Please try again!'
                        });                                            
                    }
                });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Veuillez saisir votre e-mail!' }],
                    })(
                    <Input 
                        prefix={<Icon type="user" />}
                        size="large"
                        name="username" 
                        placeholder="username" />    
                    )}
                </FormItem>
                <FormItem>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Veuillez saisir votre Password!' }],
                })(
                    <Input 
                        prefix={<Icon type="lock" />}
                        size="large"
                        name="password" 
                        type="password" 
                        placeholder="Password"  />                        
                )}
                </FormItem>
                
                <FormItem>
                    <Input
                        size="large"
                        name="remember"
                        type="checkbox"/><label class="l"> Remember me</label>
                     <Link to="/signup" class="s"> Mot de pass oublié !</Link>
                     <Button  htmlType="submit" size="large" className="login-form-button" >Se connecter</Button>
                </FormItem>
            </Form>
        );
    }
}


export default Login;