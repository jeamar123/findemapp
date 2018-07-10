import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput, AsyncStorage  } from 'react-native';
import { Header } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Storage from 'react-native-storage';

import { Container } from '../components/Container';
import { HeaderCenterContent } from '../components/HeaderCenterContent';
import { UserList } from '../components/UserList';
import { SideMenuDrawer } from '../components/SideMenuDrawer';
import { SideMenuContent } from '../components/SideMenuContent';
import { AddContactContent } from '../components/AddContactContent';
import { ChatContent } from '../components/ChatContent';


class Home extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingState : false,
      showAddContactContent : false,
      showChatContent : false,
      selectedContact : {}
    }
  }

  openDrawer = () =>{
    this.refs.sidemenu.menuToggle();
  }

  refreshUserList = () =>{
    this.refs.userlist._fetchList();
  }

  addContactToggle = () =>{
    if( this.state.showAddContactContent == false ){
      this.setState({ showAddContactContent : true }) 
    }else{
      this.setState({ showAddContactContent : false }) 
    }
  }

  chatToggle = (value) =>{
    this.setState({ selectedContact : value });
    if( this.state.showChatContent == false ){
      this.setState({ showChatContent : true }) 
    }else{
      this.setState({ showChatContent : false }) 
    }
  }

  toggleLoadingState = () =>{
    if( this.state.loadingState == false ){
      this.setState({ loadingState : true }) 
    }else{
      this.setState({ loadingState : false }) 
    }
  }

	render () {
    const menu = <SideMenuContent 
                  onHomePress={() => this.props.navigation.replace('Home')} 
                  onSettingsPress={() => this.props.navigation.replace('Settings')} 
                  onLogoutPress={() => this.props.navigation.replace('Login')}
                  toggleLoading={() => this.toggleLoadingState()}
                 />;

    return (  
      <SideMenuDrawer ref="sidemenu" menu={ menu } >
        <Container>

          <Header
            outerContainerStyles={{ 
              height: 80, 
              backgroundColor: '#fff', 
              shadowOpacity: 0.5, 
              shadowRadius: 1, 
              shadowColor: '#333', 
              shadowOffset: { 
                height: 1, 
                width: 0 
              }, 
            }}
            centerComponent={ this.state.showChatContent == true ? <HeaderCenterContent selectedUser={this.state.selectedContact} /> : null }
            leftComponent={{ 
              icon: this.state.showAddContactContent ? 'menu' : ( this.state.showChatContent == true ? 'close' : 'menu'), 
              size: 25, 
              underlayColor: '#fff', 
              color: '#333', 
              onPress: () => this.state.showAddContactContent ? this.openDrawer() : ( this.state.showChatContent == true ? this.chatToggle() : this.openDrawer() )
            }}
            rightComponent={{ 
              icon: this.state.showAddContactContent ? 'clear' : ( this.state.showChatContent == true ? 'info' : 'search'), 
              size: 25, 
              underlayColor: '#fff', 
              color: '#333', 
              onPress: () => this.state.showChatContent == true ? null : this.addContactToggle() 
            }}
          />

          {
            !this.state.showAddContactContent && !this.state.showChatContent ?
              <UserList ref="userlist" userClicked={(value) => this.chatToggle(value)} toggleLoading={() => this.toggleLoadingState()} />
            : null
          }

          {
            this.state.showAddContactContent ?
              <AddContactContent ref="addcontact" toggleLoading={() => this.toggleLoadingState()} /> 
            : null
          }

          {
            this.state.showChatContent ?
              <ChatContent ref="chat" selectedUser={this.state.selectedContact} toggleLoading={() => this.toggleLoadingState()} /> 
            : null
          }
          
          <OrientationLoadingOverlay
            visible={this.state.loadingState}
            color="white"
            indicatorSize="large"
            messageFontSize={24}
            message="Loading..."
            />
        </Container>
      </SideMenuDrawer>
    )
  }
};

export default Home;
