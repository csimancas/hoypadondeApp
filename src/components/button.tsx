import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';


type CustomButtonProps = {
  text: string;
  buttonColor?: string;
  textColor?: string;
  onPress: () => void;
};

const CustomButton: React.FC<CustomButtonProps> = ({
  
}) => {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        color={buttonColor}
        onPress={onPress}
        labelStyle={[styles.label, { color: textColor }]}
        style={styles.button}
      >
        {text}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderRadius: 8,
  },
  label: {
    fontWeight: 'bold',
  },
});

export default CustomButton;
