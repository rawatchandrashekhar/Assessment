import {StyleSheet, View} from 'react-native';
import React from 'react';
import {ButtonComponent} from '../../../components';

interface Props {
  disabled: boolean;
  loading: boolean;
  onPress: () => void;
}

const FooterComponent = ({disabled, loading, onPress}: Props) => {
  return (
    <View style={styles.container}>
      <ButtonComponent
        disabled={disabled}
        loading={loading}
        onPress={onPress}
        title="Click here to Loadmore..."
      />
    </View>
  );
};

export default FooterComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
