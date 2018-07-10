import EStyleSheet from 'react-native-extended-stylesheet';
import { StatusBar, Platform } from 'react-native';	

export default EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor:'#FFF',
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#EEE",
  },
  imageContainer: {
    height: 170, 
    backgroundColor: '#f3f3f3', 
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex: 1,
    padding: 20
  },
  ScrollContainer: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 10,
  },
  header_img:{
  	height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  userName: {
    marginTop: 15,
    fontWeight: '500',
    fontSize: 18
  },
  userEmail: {
    marginTop: 3,
    fontSize: 12
  },
  item: {
    width: '95%',
    height: 60, 
    backgroundColor: 'transparent', 
    flex: 1,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    borderBottomWidth : 1,
    borderBottomColor: '#e1e1e1',
    alignSelf: 'center'
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button_img:{
    width: 20,
    height: 20,
    flexDirection: 'column',
    marginRight: 15
  },
  item_desc:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 13,
    color: '#333'
  },



  font8: {
    fontSize: 8
  },
  font10: {
  	fontSize: 10
  },
  font12: {
  	fontSize: 12
  },
  font14: {
  	fontSize: 14
  },
  colorWhite: {
  	color: '#FFF'
  },
  weight700: {
    fontWeight: '700'
  },
  justifyContentCenter: {
    justifyContent: 'center'
  },
  alignItemsCenter: {
    alignItems: 'center',
  }
});
