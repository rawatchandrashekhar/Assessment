import React, {useState} from 'react';
import {
  View,
  Text,
  TextInputProps,
  TextInput,
  StyleSheet,
  StyleProp,
  TextStyle,
} from 'react-native';
import {COLORS} from '../assets/colors';

interface ComponentProps extends TextInputProps {
  error: string | undefined;
  inputBoxStyleProp?: StyleProp<TextStyle>;
}

const TextInputComponent = (props: ComponentProps) => {
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  return (
    <View>
      <TextInput
        {...props}
        onFocus={() => setIsInputBoxFocused(true)}
        onBlur={() => setIsInputBoxFocused(false)}
        style={[
          styles.inputBoxStyle,
          {
            borderColor: isInputBoxFocused ? COLORS.black : COLORS.grey,
          },
          props.inputBoxStyleProp,
        ]}
      />
      {props?.error && (
        <Text style={styles.errorTextStyle}>{props?.error}</Text>
      )}
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  inputBoxStyle: {
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 5,
  },
  errorTextStyle: {
    marginTop: 5,
    color: COLORS.red,
    fontSize: 12,
  },
});
