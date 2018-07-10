import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import SideMenu from 'react-native-side-menu';

import styles from './styles';

class SideMenuDrawer extends Component {
	constructor(props){
    super(props);
    this.menuState = {
      isOpen: false,
    }
  }

  menuToggle() {
    if( this.menuState.isOpen == true ){
      this.menuState.isOpen = false;
    }else{
      this.menuState.isOpen = true;
    }
    this.setState({
      isOpen: this.menuState.isOpen
    });
  }

  slideComplete(isOpen) {
    this.menuState.isOpen = isOpen;
  }

	render () {
		const children = this.props.children;
		const menu = this.props.menu;

    return (
			<SideMenu 
		    bounceBackOnOverdraw={false}
		    menu={menu} 
		    isOpen={this.menuState.isOpen}
		    onChange={(isOpen) => this.slideComplete(isOpen)}
		    >
		    {children}
		  </SideMenu>
  	)
  }
};

SideMenuDrawer.propTypes = {
  children: PropTypes.any,
  menu: PropTypes.element,
};

export default SideMenuDrawer;
