import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

import Config from '../../config/config';

class LoginForm extends Component {
  constructor(props){
    super(props);
    this.loginData = { 
      email : '',
      password : '',
    }
    this.state = {
      loadingState : false,
      isCheckingSession : true,
    }
  }

  toggleLoadingState = () =>{
    if( this.state.loadingState == false ){
      this.setState({ loadingState : true }) 
    }else{
      this.setState({ loadingState : false }) 
    }
  }

  toggleChecking = () =>{
    if( this.state.isCheckingSession == false ){
      this.setState({ isCheckingSession : true }) 
    }else{
      this.setState({ isCheckingSession : false }) 
    }
  }

  _loginUser = async ( ) =>{
  	if( this.loginData.email == '' || this.loginData.password == '' ){
  		alert( 'Input email and password.' );
  		return false;
  	}
    this.toggleLoadingState();
    try {
      let response = await fetch(Config.server_url + 'api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: this.loginData.email, password: this.loginData.password }),
      });
      let responseJson = await response.json();
      this.toggleLoadingState();
      if( responseJson.status == true ){
        storage.save({
          key: 'userData',
          data: responseJson.user,
        });
      	this.props.onLoginSucess();
      }else{
      	alert(responseJson.message);
      }
    }catch (error) {
      console.error(error);
    }
  }

  componentDidMount(){
    storage.load({
      key: 'userData',
    }).then(ret => {
      console.log('userdata:',ret);
      ret != null ? this.props.onLoginSucess() : this.toggleChecking();
    }).catch(err => {
      console.log(err);
      switch (err.name) {
        case 'NotFoundError':
          storage.save({
            key: 'userData',
            data: null,
          });
          break;
        case 'ExpiredError':
          this.toggleChecking();
          break;
      }
    })
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      	<KeyboardAvoidingView behavior="padding" style={styles.container}>
      		<Image source={require('../../images/user_image.png')} style={styles.img}/>

          {
            this.state.isCheckingSession == true ?
              <Image source={require('../../images/loading.gif')} style={styles.loadingImg}/>
            :
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Icon
                    name='vpn-key'
                    color='#999'
                    size={30}
                    containerStyle={styles.emailIcon}
                  />
                  <TextInput
                    placeholder="Email" 
                    style={styles.input} 
                    onChangeText={(text) => this.loginData.email = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon
                    name='lock'
                    color='#999'
                    containerStyle={styles.passwordIcon}
                  />
                  <TextInput
                    placeholder="Password" 
                    style={styles.input} 
                    onChangeText={(text) => this.loginData.password = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                    secureTextEntry={true}
                  />
                </View>

                {
                  this.state.loadingState == true ?
                    <Image source={require('../../images/loading.gif')} style={styles.loadingImg}/>
                  :
                    <TouchableOpacity onPress={() => this._loginUser()} style={styles.loginButton}>
                      <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                }
                
              </View>
          }
      		

      		<TouchableOpacity onPress={() => this.props.onSignupPress()} style={styles.signupLink}>
  		      <Text style={styles.signupText}>No Account yet? Signup now!</Text>
  		    </TouchableOpacity>
      	</KeyboardAvoidingView>
      </ScrollView>
    )
  }
  
};

LoginForm.propTypes = {
  onSignupPress: PropTypes.func,
  onLoginSucess: PropTypes.func,
};

export default LoginForm;
