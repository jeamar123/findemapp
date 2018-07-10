import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { AppRegistry, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';

import Config from '../../config/config';

class SideMenuContent extends Component {
  constructor( props ){
    super(props);
    this.userData = {};
  }

  componentDidMount(){
    storage.load({
      key: 'userData',
    }).then(ret => {
      this.userData = ret;
    }).catch(err => {
      console.warn(err);
    })
  }

  logoutUser = async ( ) =>{
    try {
      let response = await fetch( Config.server_url + 'api/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: this.userData.id }),
      });
      let responseJson = await response.json();
      this.props.toggleLoading();
      if( responseJson.status == true ){
        storage.save({
          key: 'userData',
          data : null
        });
        this.props.onLogoutPress();
      }else{
        console.log(responseJson);
      }
    }catch (error) {
      console.error(error);
    }

    
  }

  render () {
    return (
    	<View style={styles.container}>
        <ScrollView style={styles.ScrollContainer}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ 'uri' : this.userData.img }} 
              style={styles.header_img}
            />
            <Text style={styles.userName}>{ this.userData.name }</Text>
            <Text style={styles.userEmail}>{ this.userData.email }</Text>
          </View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.onHomePress()} >
              <Image source={require('../../images/home-black.png')} resizeMode={'contain'} style={styles.button_img}/>
              <Text style={[styles.item_desc]}>Home</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.button} onPress={() => this.props.onSettingsPress()} >
              <Image source={require('../../images/settings-black.png')} resizeMode={'contain'} style={styles.button_img}/>
              <Text style={[styles.item_desc]}>Settings</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.item}>
            <TouchableOpacity style={styles.button} onPress={() => this.logoutUser()} >
              <Image source={require('../../images/logout-black.png')} resizeMode={'contain'} style={styles.button_img}/>
              <Text style={[styles.item_desc]}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    )
  }
};


SideMenuContent.propTypes = {
  onLogoutPress: PropTypes.func,
  onSettingsPress: PropTypes.func,
  onHomePress: PropTypes.func,
  toggleLoading: PropTypes.func,
};

export default SideMenuContent;