import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';

import styles from './styles';

import Config from '../../config/config';

class RegisterForm extends Component {
  constructor(props){
    super(props);
    this.signupData = { 
      name : '',
      email : '',
      password : '',
      repassword : '',
    }
    this.state = {
      loadingState : false
    }
  }

  toggleLoadingState = () =>{
    if( this.state.loadingState == false ){
      this.setState({ loadingState : true }) 
    }else{
      this.setState({ loadingState : false }) 
    }
  }

  _registerUser = async ( ) =>{
  	if( this.signupData.name == '' || this.signupData.email == '' || this.signupData.password == '' || this.signupData.repassword == '' ){
  		alert( 'Please fill up all inputs.' );
  		return false;
  	}
  	let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
  	if( reg.test(this.signupData.email) == false ){
  		alert( 'Invalid Email.' );
  		return false;
  	}	
  	if( this.signupData.password.length < 8 ){
  		alert( 'Password should be at lease 8 characters.' );
  		return false;
  	}
  	if( this.signupData.password != this.signupData.repassword ){
  		alert( 'Passwords did not match.' );
  		return false;
  	}

    this.toggleLoadingState();
    try {
      let response = await fetch(Config.server_url + 'api/signup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: this.signupData.name, email: this.signupData.email, password: this.signupData.password }),
      });
      let responseJson = await response.json();
      this.toggleLoadingState();
      if( responseJson.status == true ){
      	Alert.alert(
				  'Registration Successfull',
				  'Proceed to Login page?',
				  [
				    {text: 'Yes', onPress: () => this.props.onLoginViewPress()},
				    {text: 'No', onPress: () => console.log('')},
				  ],
				  { cancelable: false }
				)
      }else{
      	alert(responseJson.message);
      }
    }catch (error) {
      console.error(error);
    }
  }

  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      	<KeyboardAvoidingView behavior="padding" style={styles.container}>
      		<Image source={require('../../images/register.png')} style={styles.img}/>

      		<View style={styles.form}>
  	        <View style={styles.inputContainer}>
  	        	<Icon
  	            name='person'
  	            color='#999'
  	            size={30}
  	            containerStyle={styles.emailIcon}
  	          />
  	          <TextInput
  	            placeholder="Name" 
  	            style={styles.input} 
  	            onChangeText={(text) => this.signupData.name = text} 
  	            underlineColorAndroid="transparent"
  	            avoidKeyboard={true}
  	          />
  	        </View>
  	        <View style={styles.inputContainer}>
  	        	<Icon
  	            name='list'
  	            color='#999'
  	            size={30}
  	            containerStyle={styles.emailIcon}
  	          />
  	          <TextInput
  	            placeholder="Email" 
  	            style={styles.input} 
  	            onChangeText={(text) => this.signupData.email = text} 
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
  	            onChangeText={(text) => this.signupData.password = text} 
  	            underlineColorAndroid="transparent"
  	            avoidKeyboard={true}
  	            secureTextEntry={true}
  	          />
  	        </View>
  	        <View style={styles.inputContainer}>
  	        	<Icon
  	            name='lock'
  	            color='#999'
  	            containerStyle={styles.passwordIcon}
  	          />
  	          <TextInput
  	            placeholder="Re-Type Password" 
  	            style={styles.input} 
  	            onChangeText={(text) => this.signupData.repassword = text} 
  	            underlineColorAndroid="transparent"
  	            avoidKeyboard={true}
  	            secureTextEntry={true}
  	          />
  	        </View>

  	        {
              this.state.loadingState == true ?
                <Image source={require('../../images/loading.gif')} style={styles.loadingImg}/>
              :
                <TouchableOpacity onPress={() => this._registerUser()} style={styles.loginButton}>
  					      <Text style={styles.loginText}>Register</Text>
  					    </TouchableOpacity>
            }
  	        
      		</View>

      		<TouchableOpacity onPress={() => this.props.onLoginViewPress()} style={styles.signupLink}>
  		      <Text style={styles.signupText}>Already have an account? Login now!</Text>
  		    </TouchableOpacity>
      	</KeyboardAvoidingView>
      </ScrollView>
    )
  }
  
};

RegisterForm.propTypes = {
  onLoginViewPress: PropTypes.func,
};

export default RegisterForm;
