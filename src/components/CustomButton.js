import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

const CustomButton = props => {
  const {onPressFunction, title} = props;

  return (
    <Pressable
      onPress={onPressFunction}
      style={({pressed}) => [
        {
          backgroundColor: pressed ? '#dddddd' : props.color,
        },
        styles.button,
        {...props.style},
      ]}
      android_ripple={{color: '#00f'}}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
  },
  button: {
    width: 150,
    height: 50,
    alignItems: 'center',
    borderRadius: 10,
  },
});

export default CustomButton;
