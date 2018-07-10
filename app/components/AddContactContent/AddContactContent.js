import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

import styles from './styles';

import Config from '../../config/config';

class AddContactContent extends Component {
  constructor(props){
    super(props);
    this.state = { 
      userArr: [] 
    }
    this.userData = {};
    this.searchUser = "";
  }

  _addContact = async ( contact ) =>{
    this.props.toggleLoading();
    try {
      let response = await fetch(Config.server_url + 'api/users/add_remove_contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: this.userData.id, contact_id: contact.contact_id, status: contact.status == true ? false : true }),
      });
      let responseJson = await response.json();
      this.props.toggleLoading();
      if( responseJson.status == true ){
        this._searchList( this.searchUser );
      }
      console.log(responseJson);
    }catch (error) {
      console.error(error);
    }

  }

  _searchList = async ( text ) =>{
    this.searchUser = text;
    try {
      let response = await fetch(Config.server_url + 'api/users/search', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: this.userData.id, search: this.searchUser }),
      });
      let responseJson = await response.json();
      if( responseJson.status == true ){
        this.setState({ userArr : responseJson.users })
      }
      console.log(responseJson);
    }catch (error) {
      console.error(error);
    }
  }

  componentDidMount(){
    storage.load({
      key: 'userData',
    }).then(ret => {
      this.userData = ret;
      this._searchList();
    }).catch(err => {
      console.warn(err);
    })
  }
  
  render () {
    return (
      <View style={styles.contactContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Search People" 
            style={styles.input} 
            onChangeText={(text) => this._searchList( text )} 
            underlineColorAndroid="transparent"
            avoidKeyboard={true}
          />
          <Icon
            name='search'
            color='#000'
            containerStyle={styles.searchIcon}
          />
        </View>

        <ScrollView>
          {
            this.state.userArr.map((value, key) => (
              <View key={key} style={styles.userBox}>
                <View style={styles.avatar}>
                  <Image 
                    source={{ 'uri' : value.img }} 
                    style={styles.img}
                  />
                </View>
                <View style={styles.desc}>
                  <Text style={styles.name}>
                    {value.name}
                  </Text>
                </View>
                <TouchableOpacity 
                  onPress={() => this._addContact( value )} 
                  style={[styles.iconContainer]}
                >
                  {
                    value.status == true ?
                      <Icon
                        name='remove-circle'
                        color='#dd2c2c'
                        size={18}
                        containerStyle={styles.addIcon}
                      />
                    :
                      <Icon
                        name='person-add'
                        color='#0D813A'
                        size={24}
                        containerStyle={styles.addIcon}
                      />
                  }

                </TouchableOpacity>
              </View>
            ))
          }
        </ScrollView>
      </View>
    )
  }
  
};

AddContactContent.propTypes = {
  toggleLoading: PropTypes.func,
};

export default AddContactContent;
