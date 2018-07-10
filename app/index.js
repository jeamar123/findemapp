import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import getSlideFromRightTransition from 'react-navigation-slide-from-right-transition';
import { createStackNavigator } from 'react-navigation';
import { AsyncStorage  } from 'react-native';
import Storage from 'react-native-storage';

import LoginScreen from './screens/Login';
import RegisterScreen from './screens/Register';
import HomeScreen from './screens/Home';
import SettingsScreen from './screens/Settings';

EStyleSheet.build();

const App = createStackNavigator(
	{
	  Login: LoginScreen,
	  Register: RegisterScreen,
	  Home: HomeScreen,
	  Settings: SettingsScreen,
	},
	{
		navigationOptions: {
			header : null,
		},
		headerMode: 'none',
		transitionConfig: getSlideFromRightTransition
	}
);

const storage = new Storage({
	size: 1000,
	storageBackend: AsyncStorage,
	// expire time, default 1 day(1000 * 3600 * 24 milliseconds).
	// can be null, which means never expire.
	// defaultExpires: 1000 * 3600 * 24,
	defaultExpires: null,
	// cache data in the memory. default is true.
	enableCache: true,
	// if data was not found in storage or expired,
	// the corresponding sync method will be invoked and return 
	// the latest data.
	sync : {
		// we'll talk about the details later.
	}
})

global.storage = storage;

export default () => <App />;
