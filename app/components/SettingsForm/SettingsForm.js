import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import { Permissions, ImagePicker } from 'expo';

import styles from './styles';

import Config from '../../config/config';

class AddContactContent extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingState : false,
      showUpdatePassword : false,
      imageChanged : false,
    };
    this.userData = {};
    this.searchUser = "";
  }

  toggleLoadingState = () =>{
    if( this.state.loadingState == false ){
      this.setState({ loadingState : true }) 
    }else{
      this.setState({ loadingState : false }) 
    }
  }

  toggleChangePassword(){
    if( this.state.showUpdatePassword == true ){
      this.setState({ showUpdatePassword : false }) 
    }else{
      this.setState({ showUpdatePassword : true }) 
    }
  }

  removeImage(){
    this.setState({ imageChanged : false });
    this.userData.img = this.userData.original_img;
  }

  pickFromGallery = async () => {
    this.props.toggleLoading();
    const permissions = Permissions.CAMERA_ROLL;
    const { status } = await Permissions.askAsync(permissions);

    if(status === 'granted') {
      let image = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 4],
        mediaTypes: 'Images',
      }).catch(error => console.log(permissions, { error }));
      this.props.toggleLoading();
      console.log(image);

      if (!image.cancelled) {
        this.userData.img = image.uri;
        this.setState({ imageChanged : true });
      }
    }else{
      this.props.toggleLoading();
      alert( "Cannot open Gallery. No Permissions." );
    }

  };

  pickFromCamera = async () => {
    this.props.toggleLoading();
    const permissions = Permissions.CAMERA;
    const { status } = await Permissions.askAsync(permissions);

    console.log(permissions, status);
    if(status === 'granted') {
      this.props.toggleLoading();
      let image = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      }).catch(error => console.log(permissions, { error }));
      console.log(permissions, 'SUCCESS', image);
    }else{
      this.toggleLoadingState();
    }
  }

  _updateSettings = async (  ) =>{
    if( this.userData.name == '' || this.userData.email == '' ){
      alert( 'Please fill up all inputs.' );
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if( reg.test(this.userData.email) == false ){
      alert( 'Invalid Email.' );
      return false;
    } 

    this.toggleLoadingState();
    
    let formData = new FormData( );
    let data = {
      id : this.userData.id,
      name : this.userData.name,
      img : this.userData.img,
      email : this.userData.email,
    }

    if( this.state.imageChanged == true ){
      let image_data = this.userData.img;
      let uriParts = image_data.split('.');
      let fileType = uriParts[uriParts.length - 1];

      formData.append('file',{
        uri: image_data,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });

      formData.append('id', this.userData.id);
      formData.append('name', this.userData.name);
      formData.append('email', this.userData.email);
    }

    try {
      let response = await fetch( Config.server_url + 'api/users/update', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': this.state.imageChanged == true ? 'multipart/form-data' : 'application/json',
        },
        body: this.state.imageChanged == true ? formData : JSON.stringify( data ),
      });
      let responseJson = await response.json();
      this.toggleLoadingState();
      if( responseJson.status == true ){
        storage.save({
          key: 'userData',
          data: responseJson.user,
        });
      }

      alert( responseJson.message );
    }catch (error) {
      console.error(error);
    }
  }

  _updatePasswords = async (  ) =>{
    if( !this.userData.newpassword || !this.userData.newrepassword || this.userData.newpassword == '' || this.userData.newrepassword == '' ){
      alert( 'Please fill up all inputs.' );
      return false;
    }
    if( this.userData.newpassword.length < 8 || this.userData.newpassword.length < 8 ){
      alert( 'Password should be at lease 8 characters.' );
      return false;
    }
    if( this.userData.newpassword != this.userData.newrepassword ){
      alert( 'New Passwords did not match.' );
      return false;
    }
    this.toggleLoadingState();
    var data = {
      id : this.userData.id,
      new_password : this.userData.newpassword,
    }
    try {
      let response = await fetch( Config.server_url + 'api/users/update_password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( data ),
      });
      this.toggleLoadingState();
      let responseJson = await response.json();
      if( responseJson.status == true ){
        alert(responseJson.message);
        this.userData.newpassword = "";
        this.userData.newrepassword = "";
        this.toggleChangePassword();
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
      this.userData = ret;
      this.userData.original_img = ret.img;
    }).catch(err => {
      console.warn(err);
    })
  }
  
  render () {
    return (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior="position"
        >
          {
            this.state.showUpdatePassword == false ?
              <View style={styles.form}>
                <TouchableOpacity style={{alignItems: 'center'}}  onPress={() => this.pickFromGallery()}>
                  {
                    this.state.imageChanged == true ?
                      <Image source={{ 'uri' : this.userData.img }} style={styles.img}/>
                    :
                      <Image source={{ 'uri' : this.userData.img }} style={styles.img}/>
                  }
                  { this.state.imageChanged == false ? <Text style={styles.imgChangeText}>Tap to Change</Text> : null}
                </TouchableOpacity>

                { 
                  this.state.imageChanged == true ? 
                    <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.removeImage()}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  : null 
                }

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
                    onChangeText={(text) => this.userData.name = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                    value={this.userData.name}
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
                    onChangeText={(text) => this.userData.email = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                    value={this.userData.email}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon
                    name='lock'
                    color='#999'
                    size={30}
                    containerStyle={styles.emailIcon}
                  />
                  <View style={styles.passwordBoxContainer}>
                    <Text style={styles.passwordText}>
                      ***************
                    </Text>
                    <Icon
                      name='edit'
                      color='#999'
                      size={20}
                      containerStyle={styles.editIcon}
                      onPress={() => this.toggleChangePassword()}
                    />
                  </View>
                </View>
                
                {
                  this.state.loadingState == true ?
                    <Image source={require('../../images/loading.gif')} style={styles.loadingImg}/>
                  :
                    <TouchableOpacity onPress={() => this._updateSettings()} style={styles.updateButton}>
                      <Text style={styles.updateText}>Update</Text>
                    </TouchableOpacity>
                }

              </View>
            :
              <View style={styles.form}>
                <Image source={{ 'uri' : this.userData.img }} style={[ styles.img, { marginBottom: 30 }]}/>
                
                <View style={styles.inputContainer}>
                  <Icon
                    name='lock'
                    color='#999'
                    containerStyle={styles.passwordIcon}
                  />
                  <TextInput
                    placeholder="New Password" 
                    style={styles.input} 
                    onChangeText={(text) => this.userData.newpassword = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                    value={this.userData.newpassword}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <Icon
                    name='lock'
                    color='#999'
                    containerStyle={styles.passwordIcon}
                  />
                  <TextInput
                    placeholder="Re-type New Password" 
                    style={styles.input} 
                    onChangeText={(text) => this.userData.newrepassword = text} 
                    underlineColorAndroid="transparent"
                    avoidKeyboard={true}
                    value={this.userData.newrepassword}
                  />
                </View>
                
                {
                  this.state.loadingState == true ?
                    <Image source={require('../../images/loading.gif')} style={styles.loadingImg}/>
                  :
                    <View style={styles.passButtonContainer}>
                      <TouchableOpacity onPress={() => this.toggleChangePassword()} style={styles.cancelPasswordButton}>
                        <Text style={styles.updateText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this._updatePasswords()} style={styles.updatePasswordButton}>
                        <Text style={styles.updateText}>Update</Text>
                      </TouchableOpacity>
                    </View>
                }

              </View>

          }
          

          

        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
  
};

AddContactContent.propTypes = {
  toggleLoading: PropTypes.func,
};

export default AddContactContent;
