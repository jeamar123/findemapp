import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  scrollContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  container: {
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    position: 'relative',
    padding: 20
  },
  img: {
    width: 120,
    height: 120,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 60,
    marginBottom: 30,
    alignSelf: 'center',
  },
  loadingImg: {
    width: 50,
    height: 50,
    marginTop: 33,
  },
  form: {
  	width: '100%',
  	justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
	  flexDirection: 'row',
	  height: 50,
	  width: '90%',
	  borderWidth: 0,
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 0,
    backgroundColor: 'transparent',
    borderRadius: 4,
    marginBottom: 10
	},
  input: {
  	flex: 1,
  	height: 50,
  	paddingBottom: 10,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingLeft: 15,
  	paddingRight: 0,
  	backgroundColor: '#f5f5f5',
  	borderTopLeftRadius: 4,
  	borderBottomLeftRadius: 4,
  },
  emailIcon: {
    height: 50,
    width: 50,
    borderRightWidth: 2,
  	borderColor: '#fff',
  	justifyContent: 'center',
	  alignItems: 'center',
	  borderTopRightRadius: 4,
  	borderBottomRightRadius: 4,
  	backgroundColor: '#f5f5f5',
	},
	passwordIcon: {
    height: 50,
    width: 50,
    borderRightWidth: 2,
  	borderColor: '#fff',
  	justifyContent: 'center',
	  alignItems: 'center',
	  borderTopRightRadius: 4,
  	borderBottomRightRadius: 4,
  	backgroundColor: '#f5f5f5',
	},
	loginButton: {
  	backgroundColor: "#3abed8",
    paddingTop: 15,
    paddingRight: 12,
    paddingBottom: 15,
    paddingLeft: 12,
    alignSelf: "center",
    borderRadius: 4,
    width: '70%',
    marginTop: 30,
  },
  loginText: {
  	color: '#FFF',
  	textAlign: 'center',
  	fontSize: 18
  },
  signupLink: {
  	position: 'absolute',
  	bottom: 20,
  	width: '100%',
  	justifyContent: 'center',
	  alignItems: 'center',
  },
  signupText: {
  	fontSize: 14,
  	color: '#aaa',
  }
});
