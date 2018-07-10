import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Moment from 'moment';

import styles from './styles';

import Config from '../../config/config';

class HeaderCenterContent extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    
  }
  
  render () {
    Moment.locale('en');

    return (
      <View style={styles.container}>
        <Text style={styles.nameText}> { this.props.selectedUser.name } </Text>
        
        {
          this.props.selectedUser.isActive == true ?
            <View style={styles.activeContainer}>
              <Text style={styles.activeText}>Active now</Text>
              <Icon
                name='lens'
                color='#42B72A'
                size={8}
                containerStyle={styles.activeIcon}
              />
            </View>
          :
            <Text style={styles.timeText}> { Moment(this.props.selectedUser.last_session).fromNow() } </Text>
        }
      </View>
    )
  }
  
};

HeaderCenterContent.propTypes = {
  selectedUser: PropTypes.object,
};

export default HeaderCenterContent;
