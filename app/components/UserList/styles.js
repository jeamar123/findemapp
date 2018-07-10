import EStyleSheet from 'react-native-extended-stylesheet';

export default EStyleSheet.create({
  container: {
    flex : 1,
    flexDirection: 'column',
  },
  boxContainer: {
    height: 80,
    justifyContent: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    borderLeftWidth: 5,
    borderLeftColor: '#01CFFF',
    backgroundColor: '#FFF',
    marginTop: 5,
  },
  avatar: {
    width: 75,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 10,
  },
  img: {
    width: 45,
    height: 45,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 22.5,
  },
  desc: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 10,
  },
  time: {
    width: 110,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
  },
  name: {
  	fontSize: 18,
    marginBottom: 3
  },
  msg: {
    fontSize: 13,
    color: '#ccc',
    fontStyle: 'italic'
  },
  timeText: {
    fontSize: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active_icon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactContainer: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactText: {
    color : '#aaa',
  }
});
