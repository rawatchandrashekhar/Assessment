import {Dimensions, StyleSheet} from 'react-native';

import {COLORS} from '../../assets/colors';

const {width} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginHorizontal: 10,
  },
  images: {
    width: width,
    height: 300,
  },
  imageContainer: {
    marginVertical: 10,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
