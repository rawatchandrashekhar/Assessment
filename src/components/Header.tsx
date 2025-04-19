import React, {ReactNode} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../assets/colors';
import {useNavigation} from '@react-navigation/native';
import {ICONS} from '../assets/Icons';

interface Props {
  title: string;
  rightContent?: ReactNode;
  leftContent?: ReactNode;
}

const Header = ({
  leftContent = (
    <Image source={ICONS.goBack} resizeMode="contain" style={styles.icon} />
  ),
  title,
  rightContent,
}: Props) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.goBack()}
          style={styles.leftContainerStyle}>
          {leftContent}
        </TouchableOpacity>
        <View style={styles.centerContainerStyle}>
          <Text style={styles.titleTextStyle}>{title}</Text>
        </View>
        <View style={styles.rightContainerStyle}>{rightContent}</View>
      </View>
      <View style={styles.dividerStyle} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.black,
  },
  dividerStyle: {
    height: 1,
    backgroundColor: COLORS.grey,
    width: '100%',
  },
  leftContainerStyle: {width: '20%'},
  centerContainerStyle: {width: '60%', alignItems: 'center'},
  rightContainerStyle: {width: '20%', alignItems: 'flex-end'},
  icon: {
    width: 35,
    height: 35,
  },
});
