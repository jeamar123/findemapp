import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { Container } from '../components/Container';
import { LoginForm } from '../components/LoginForm';


class Login extends Component {
  constructor(props){
    super(props);
  }

  goToHome = () =>{
    this.props.navigation.replace('Home')
  }

	render () {
    return (  
      <Container>
        <LoginForm 
          ref="loginform" 
          onSignupPress={() => this.props.navigation.replace('Register')} 
          onLoginSucess={() => this.goToHome()}
        />
      </Container>
    )
  }
};

export default Login;
