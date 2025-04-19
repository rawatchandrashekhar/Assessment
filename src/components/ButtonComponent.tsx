import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../assets/colors';

interface Props {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const ButtonComponent = ({disabled, loading, onPress, title}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[styles.btn]}>
      {loading ? (
        <ActivityIndicator color={COLORS.black} size="small" />
      ) : (
        <Text style={styles.titleTextStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 10,
    marginVertical: 15,
    width: '100%',
    borderWidth: 1.5,
    borderColor: COLORS.black,
    backgroundColor: COLORS.white,
  },
  titleTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
});
