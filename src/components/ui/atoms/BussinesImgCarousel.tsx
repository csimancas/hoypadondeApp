import React from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

interface BussinesDetailProps {
    img: string [];
}

const BussinesImgCarousel= ({img} : BussinesDetailProps) => {
  return (
    <View style={styles.container}>
      <Carousel
        loop
        width={width}
        height={250}
        data={img}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{uri: item}} style={styles.image} resizeMode="cover" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  imageContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: width * 0.9,
    height: 250,
    borderRadius: 10,
  },
});

export default BussinesImgCarousel;
