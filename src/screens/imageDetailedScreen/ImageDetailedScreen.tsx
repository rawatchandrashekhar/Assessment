import React, {useState} from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {Formik} from 'formik';
import {RouteProp, useRoute} from '@react-navigation/native';

import {styles} from './ImageDetailedScreenStyle';
import {ButtonComponent, Header, TextInputComponent} from '../../components';
import {FormValuesType} from '../../types/ImageDetailedScreenTypes';
import {formValidationSchema} from '../../validations/formsValidation';
import {RootStackParamList} from '../../navigation/NavigationType';
import {getMimeType} from '../../utils';
import {APIEndpoints} from '../../API/APIEndpoints';

const initialValues: FormValuesType = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
};

const ImageDetailedScreen = () => {
  const {params} =
    useRoute<RouteProp<RootStackParamList, 'ImageDetailedScreen'>>();

  const [btnLoader, setBtnLoader] = useState(false);

  const handleFormSubmit = async (values: FormValuesType, {resetForm}: any) => {
    try {
      setBtnLoader(true);
      const {firstName, lastName, email, phone} = values;
      const mimeType = getMimeType(params?.image);
      const fileName = params?.image?.split('/')?.pop();
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('user_image', {
        uri: params?.image,
        name: fileName,
        type: mimeType,
      });
      const response = await fetch(APIEndpoints.saveUserData, {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result?.status === 'success') {
        setBtnLoader(false);
        resetForm();
        ToastAndroid.show(result?.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      setBtnLoader(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Detail Screen" />
      <KeyboardAvoidingView
        style={styles.keyBoardAvoidingContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'position'}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Image
            source={{
              uri: params?.image,
            }}
            style={styles.imageStyle}
          />
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={formValidationSchema}>
            {({handleChange, handleSubmit, values, errors}) => (
              <View style={styles.formContainer}>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>First Name</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInputComponent
                      onChangeText={handleChange('firstName')}
                      value={values.firstName}
                      placeholder="Enter First Name"
                      error={errors.firstName}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Last Name</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInputComponent
                      onChangeText={handleChange('lastName')}
                      value={values.lastName}
                      placeholder="Enter Last Name"
                      error={errors.lastName}
                      keyboardType="default"
                    />
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Email</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInputComponent
                      onChangeText={handleChange('email')}
                      value={values.email}
                      placeholder="Enter your mail"
                      error={errors.email}
                      keyboardType="email-address"
                    />
                  </View>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.textStyle}>Phone</Text>
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInputComponent
                      onChangeText={handleChange('phone')}
                      value={values.phone}
                      placeholder="Enter your phone number"
                      error={errors.phone}
                      keyboardType="number-pad"
                      maxLength={10}
                    />
                  </View>
                </View>
                <View style={styles.btnContainer}>
                  <ButtonComponent
                    disabled={btnLoader}
                    loading={btnLoader}
                    onPress={handleSubmit}
                    title="Submit"
                  />
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ImageDetailedScreen;
