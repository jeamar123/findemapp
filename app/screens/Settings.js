import React, { Component } from 'react';
import { StatusBar, View, Text, TouchableOpacity, TextInput, AsyncStorage  } from 'react-native';
import { Header } from 'react-native-elements';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Storage from 'react-native-storage';

import { Container } from '../components/Container';
import { SideMenuDrawer } from '../components/SideMenuDrawer';
import { SideMenuContent } from '../components/SideMenuContent';
import { SettingsForm } from '../components/SettingsForm';


class Settings extends Component {
  constructor(props){
    super(props);
    this.state = {
      loadingState : false,
    }
  }

  openDrawer = () =>{
    this.refs.sidemenu.menuToggle();
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
            centerComponent={{ 
              text: '', 
              style: { 
                color: '#333', 
                fontSize: 20, 
                fontStyle: 'italic' 
              } 
            }}
            leftComponent={{ 
              icon: !this.state.showAddContactContent ? 'menu' : 'menu', 
              size: 25, 
              underlayColor: '#fff', 
              color: '#333', 
              onPress: () => !this.state.showAddContactContent ? this.openDrawer() : this.openDrawer()
            }}
            rightComponent={{ 
              icon: 'home', 
              size: 25, 
              underlayColor: '#fff', 
              color: '#333', 
              onPress: () => this.props.navigation.replace('Home')
            }}
          />

          <SettingsForm toggleLoading={() => this.toggleLoadingState()}/>
          
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

export default Settings;
