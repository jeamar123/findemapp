import EStyleSheet from 'react-native-extended-stylesheet';
import { Dimensions } from 'react-native'

const window = Dimensions.get('window');

export default EStyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative'
  },
  nameText: {
    alignItems: 'center',
    fontSize: 13,
  },
  timeText: {
    alignItems: 'center',
    fontSize: 10
  },
  activeContainer: {
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 15,
  },
  activeText: {
    fontSize: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    width: 10 ,
    justifyContent: 'center',
    alignItems: 'center',
  }

});
