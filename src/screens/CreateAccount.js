/**
 * @flow stric-local
 * @format
 */
import React, {useState} from 'react';
import type {Node} from 'react';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {Formik} from 'formik';
import * as Yup from 'yup';

import Header from '../components/Header';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Link from '../components/Link';
import Loading from '../components/Loading';

import {useNavigation} from '@react-navigation/core';
import addParentApi from '../api/Parent';

const FORM_SCHEMA = Yup.object().shape({
  firstname: Yup.string().required(),
  lastname: Yup.string().required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(4).required(),
});

const FORM_INITIAL_VALUES = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
};

const CreateAccount = (): Node => {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const addParent = async values => {
    setIsLoading(true);
    try {
      const result = await addParentApi(values);
      navigation.navigate('LinkBank');
    } catch (error) {
      Alert.alert('Error', 'A parent was not created');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <KeyboardAwareScrollView contentContainerStyle={styles.container}>
        <Header
          title="Create Your Account"
          subtitle="You can be a parent, godparent, grandparent or even a favorite aunt. We’ll add the kids after!"
        />
        <Formik
          initialValues={FORM_INITIAL_VALUES}
          onSubmit={addParent}
          validationSchema={FORM_SCHEMA}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            isValid,
            dirty,
          }) => {
            return (
              <View style={styles.container}>
                <View style={styles.formContainer}>
                  <TextInput
                    label="First name"
                    placeholder="First name"
                    type="person"
                    value={values.firstname}
                    handleChange={handleChange('firstname')}
                    handleBlur={handleBlur('firstname')}
                    error={errors.firstname}
                    touched={touched.firstname}
                    name="firstname"
                  />

                  <TextInput
                    label="Last name"
                    placeholder="Last name"
                    type="person"
                    value={values.lastname}
                    handleChange={handleChange('lastname')}
                    handleBlur={handleBlur('lastname')}
                    error={errors.lastname}
                    touched={touched.lastname}
                    name="lastname"
                  />

                  <TextInput
                    label="Email"
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    handleChange={handleChange('email')}
                    handleBlur={handleBlur('email')}
                    error={errors.email}
                    touched={touched.email}
                    name="email"
                  />

                  <TextInput
                    label="Password"
                    placeholder="Password"
                    type="password"
                    value={values.password}
                    handleChange={handleChange('password')}
                    handleBlur={handleBlur('password')}
                    error={errors.password}
                    touched={touched.password}
                    name="password"
                  />
                </View>

                <View style={styles.bottomContainer}>
                  <View style={styles.adviceContainer}>
                    <Text style={styles.adviceText}>
                      By creating this account, I agree that I am a U.S.
                      resident, 18 years or older with a valid bank account. I
                      agree to Goalsetter’s {'\b'}
                      <Link
                        title="Terms of Service"
                        onPress={() => navigation.navigate('TermsOfService')}
                      />
                    </Text>
                  </View>
                  <Button
                    title="CREATE FREE ACCOUNT"
                    onPress={handleSubmit}
                    disabled={!(isValid && dirty)}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    );
  }
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  formContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  adviceContainer: {
    marginHorizontal: 24,
  },
  adviceText: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir LT Std' : 'AvenirLTStd',
    fontSize: 14,
    textAlign: 'center',
    opacity: 0.4,
  },
});
