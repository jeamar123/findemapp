import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Moment from 'moment';

import styles from './styles';

import Config from '../../config/config';

class UserList extends Component {
  constructor(props){
    super(props);
    this.state = { 
      userArr: [] 
    }
    this.userData = {};
    this.contactData = {
      name : 'Allan Alzula'
    };
  }

  _fetchList = async () =>{
    this.props.toggleLoading();
    try {
      let response = await fetch( Config.server_url + 'api/users/contacts/' + this.userData.id, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
      });
      let responseJson = await response.json();
      this.props.toggleLoading();
      if( responseJson.status == true ){
        this.setState({ userArr : responseJson.users })
      }else{
        console.log(responseJson);
      }
    }catch (error) {
      console.error(error);
      alert('No Internet Connection. Please Reload your app.');
    }

  }

  componentDidMount(){
    storage.load({
      key: 'userData',
    }).then(ret => {
      this.userData = ret;
      this._fetchList();
    }).catch(err => {
      console.warn(err);
    })
    
  }

  render () {
    Moment.locale('en');

    return (
      <ScrollView>
        <View style={styles.container}>
          {
            this.state.userArr.map((value, key) => (
              <TouchableOpacity onPress={() => this.props.userClicked(value)} key={key} style={[styles.boxContainer]}>
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
                  { 
                    value.last_location != null && value.last_location != '' ? 
                      <Text style={styles.msg}>{value.last_location}</Text> 
                    : 
                      <Text style={styles.msg}>Not available</Text> 
                  }
                </View>
                <View style={styles.time}>
                  {
                    value.isActive == true ?
                      <Icon
                        name='lens'
                        color='#42B72A'
                        size={16}
                        containerStyle={styles.active_icon}
                      />
                    :
                      <Text style={styles.timeText}>
                        {Moment(value.last_session).fromNow()}
                      </Text>
                  }
                </View>
              </TouchableOpacity>
            ))
          }

          {
            this.state.userArr.length == 0 ?
              <View style={styles.noContactContainer}>
                <Text style={styles.noContactText}>No contacts yet.</Text>
              </View>
            :
              null
          }
        </View>
      </ScrollView>
    )
  }
  
};

UserList.propTypes = {
  toggleLoading: PropTypes.func,
  userClicked: PropTypes.func,
};

export default UserList;
