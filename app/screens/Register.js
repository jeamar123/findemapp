import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { Container } from '../components/Container';
import { RegisterForm } from '../components/RegisterForm';


class Register extends Component {
  constructor(props){
    super(props);
  }

	render () {
    return (  
      <Container>
        <RegisterForm
          ref="registerform" 
          onLoginViewPress={() => this.props.navigation.replace('Login')}
        />
      </Container>
    )
  }
};

export default Register;
