import {StyleSheet} from 'react-native';

export const progressHeight = 16;
export const progressWidth = 200;

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  progressStyle: {
    marginVertical: 16,
    height: progressHeight,
    width: progressWidth,
    flex: 0,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
