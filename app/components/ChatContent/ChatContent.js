import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';

import styles from './styles';

import Config from '../../config/config';

const window = Dimensions.get('window');

const io = require('socket.io-client');
const SocketEndpoint = 'http://192.168.137.1:8080';
const socket = null;

class ChatContent extends Component {
  constructor(props){
    super(props);
    this.userData = {};
    this.state = {
      chatLog : [],
      message : ""
    }
  }

  componentDidMount(){
    console.log(window.height);

    storage.load({
      key: 'userData',
    }).then(ret => {
      this.userData = ret;
      socket = io(SocketEndpoint, {
        transports: ['websocket'],
      });
      console.log('chat-' + this.userData.id + this.props.selectedUser.id);
      socket.on('chat-' + this.userData.id + this.props.selectedUser.id, (data) => {
        this.state.chatLog.push(data);
        this.setState({
          chatLog : this.state.chatLog
        });
      });
    }).catch(err => {
      console.log(err);
    })
  }

  componentWillUnmount(){
    socket.close();
  }

  updateChatScroll(w,h){
    console.log(h);
    this.refs.chatScrollView.scrollTo({y: h - 65});
  }

  _sendMessage(){
    let send_data = { 
      from: this.userData,
      to: this.props.selectedUser, 
      msg: this.state.message
    };
    socket.emit('chat message', send_data);
    this.setState({ message: "" });
  }
  
  render () {
    return (
      <View style={styles.scrollContainer}>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={80} style={styles.chatContainer}>
          <ScrollView 
            ref="chatScrollView"  
            contentContainerStyle={styles.messageScrollContainer}
            onContentSizeChange={(width,height) => this.updateChatScroll(width,height)}
          >
          
            {
              this.state.chatLog.map((value, key) => (
                value.from.id == this.userData.id ?
                  <View key={key} style={styles.userBoxContainer}>
                    <View style={styles.userMessage}>
                      <Text style={styles.userText}>{value.msg}</Text>
                    </View>
                  </View>
                :
                  <View key={key} style={styles.contactBoxContainer}>
                    <Image 
                      source={{ 'uri' : this.props.selectedUser.img }} 
                      style={styles.contactImg}
                    />
                    <View style={styles.contactMessage}>
                      <Text style={styles.contactText}>{value.msg}</Text>
                    </View>
                  </View>
              ))
            }
            
          </ScrollView>
          <View style={styles.messageInputContainer}>
            <TextInput
              placeholder="Type a message here..." 
              style={styles.messageInput} 
              onChangeText={(text) => this.setState({ message : text })} 
              underlineColorAndroid="transparent"
              avoidKeyboard={true}
              value={this.state.message}
            />
            <Icon
              name='send'
              color='#FFF'
              containerStyle={styles.sendIcon}
              onPress={() => this._sendMessage()}
              underlayColor='#22aabf'
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    )
  }
  
};

ChatContent.propTypes = {
  toggleLoading: PropTypes.func,
  selectedUser: PropTypes.object,
};

export default ChatContent;
