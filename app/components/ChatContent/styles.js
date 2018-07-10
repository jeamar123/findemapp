import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'

const window = Dimensions.get('window');

export default EStyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  chatContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'relative',
  },
  messageScrollContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  userBoxContainer: {
    marginBottom: 15,
    width: '70%',
    height: 'auto',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  userMessage: {
    backgroundColor: '#37B2FA',
    padding: 10,
    borderRadius: 8,
    width: 'auto',
    justifyContent: 'center',
  },
  userText: {
    color: '#FFF'
  },
  contactBoxContainer: {
    marginBottom: 15,
    width: '80%',
    flexDirection: 'row',
    height: 'auto',
  },
  contactImg: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 17.5,
    marginRight: 10,
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  contactMessage: {
    backgroundColor: '#d6d6d6',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    justifyContent: 'center',
  },
  contactText: {
    color: '#444'
  },
  messageInputContainer: {
    height: 70,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInput: {
    backgroundColor: '#f9f9f9',
    height: '100%',
    flex: 1,
    paddingLeft: 10
  },
  sendIcon: {
    height: 50,
    width: 50,
    borderRightWidth: 2,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    backgroundColor: '#15BDD8',
  },

});
