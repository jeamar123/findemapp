import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  contactContainer: {
    backgroundColor: 'transparent',
    height: '100%',
    width: '100%',
    paddingTop: 5,
    paddingLeft: 10,
    paddingBottom: 80,
    paddingRight: 10,
    marginTop: 5
  },
  inputContainer: {
	  flexDirection: 'row',
	  height: 50,
	  borderWidth: 0,
	  justifyContent: 'center',
	  alignItems: 'center',
	  padding: 0,
    backgroundColor: '#FFF'
	},
  input: {
  	flex: 1,
  	height: 50,
  	paddingBottom: 10,
  	paddingTop: 10,
  	paddingBottom: 10,
  	paddingLeft: 15,
  	paddingRight: 0,
  	borderTopWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
  	borderColor: '#e1e1e1',
  	// borderTopLeftRadius: 4,
  	// borderBottomLeftRadius: 4,
  },
  searchIcon: {
    height: 50,
    width: 50,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 0,
  	borderColor: '#e1e1e1',
  	justifyContent: 'center',
	  alignItems: 'center',
	  // borderTopRightRadius: 4,
  	// borderBottomRightRadius: 4,
	},


	userBox: {
		height: 65,
    justifyContent: 'center',
    flexDirection: 'row',
    // borderWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#bbb",
    borderRadius : 4,
	},
	avatar: {
		width: 65,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
	},
	img: {
		width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 22.5,
	},
	desc: {
		flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10
	},
	iconContainer: {
		flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
	},
	addIcon: {
		width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: "#eee",
	},
  addText: {
    fontSize: 10,
    color: '#0D813A'
  },
  removeText: {
    fontSize: 10,
    // textDecorationLine: 'underline',
    color: '#dd2c2c'
  }

});
