import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Icon } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

import styles from './styles';

import Config from '../../config/config';

class ChatContent extends Component {
  constructor(props){
    super(props);
    this.state = { 
      userArr: [] ,
      toggleMainScroll : false
    }
    this.userData = {};
    console.log( this.props.selectedUser );
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
  
  render () {
    return (
      <ScrollView scrollEnabled={this.state.toggleMainScroll} contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} style={styles.chatContainer}>
          <ScrollView contentContainerStyle={styles.messageScrollContainer}>
            <View style={styles.contactBoxContainer}>
              <Image 
                source={{ 'uri' : this.props.selectedUser.img }} 
                style={styles.contactImg}
              />
              <View style={styles.contactMessage}>
                <Text style={styles.contactText}>Hello! Lorem Ipsum dolor sit amet bilat ser bilat. Lorem Ipsum dolor sit amet bilat ser bilat.</Text>
              </View>
            </View>
            <View style={styles.userBoxContainer}>
              <View style={styles.userMessage}>
                <Text style={styles.userText}>Hi! Lorem Ipsum dolor sit amet bilat ser bilat. Lorem Ipsum dolor sit amet bilat ser bilat.</Text>
              </View>
            </View>
            <View style={styles.contactBoxContainer}>
              <Image 
                source={{ 'uri' : this.props.selectedUser.img }} 
                style={styles.contactImg}
              />
              <View style={styles.contactMessage}>
                <Text style={styles.contactText}>Hello! Lorem Ipsum dolor sit amet bilat ser bilat. Lorem Ipsum dolor sit amet bilat ser bilat.</Text>
              </View>
            </View>
            <View style={styles.userBoxContainer}>
              <View style={styles.userMessage}>
                <Text style={styles.userText}>Hi! Lorem Ipsum dolor sit amet bilat ser bilat. Lorem Ipsum dolor sit amet bilat ser bilat.</Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.messageInputContainer}>
            <TextInput
              placeholder="Type a message here..." 
              style={styles.messageInput} 
              onChangeText={(text) => null} 
              onFocus={() => this.setState({ toggleMainScroll : true })} 
              onBlur={() => this.setState({ toggleMainScroll : false })} 
              underlineColorAndroid="transparent"
              avoidKeyboard={true}
            />
            <Icon
              name='send'
              color='#FFF'
              containerStyle={styles.sendIcon}
              onPress={() => null}
              underlayColor='#22aabf'
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    )
  }
  
};

ChatContent.propTypes = {
  toggleLoading: PropTypes.func,
  selectedUser: PropTypes.object,
};

export default ChatContent;
