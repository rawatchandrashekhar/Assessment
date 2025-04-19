import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    paddingBottom: 60,
  },
  imageStyle: {
    width: '100%',
    height: 300,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  textContainer: {width: '34%', top: 10},
  textStyle: {fontSize: 15, color: 'black', fontWeight: '500'},
  inputContainer: {width: '64%'},
  formContainer: {marginTop: 15},
  btnContainer: {width: '40%', alignSelf: 'flex-end'},
  keyBoardAvoidingContainer: {flex: 1},
});
