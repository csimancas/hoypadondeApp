import React from 'react';
import { View, ScrollView, Image, StyleSheet, Pressable, Dimensions } from 'react-native';
import Label from '../atoms/Label';

type OpeningHours = {
  lunes: string;
  martes: string;
  miércoles: string;
  jueves: string;
  viernes: string;
  sábado: string;
  domingo: string;
};

type BussinesCardProps = {
  name: string;
  location: string;
  opening_hours: OpeningHours;
  images?: string[]; // Se marca como opcional para mayor flexibilidad
  action: () => void;
};

const getTodaySchedule = (opening_hours: OpeningHours): string => {
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const today = new Date().getDay(); // 0 es domingo, 1 es lunes, etc.
  const todayKey = daysOfWeek[today] as keyof OpeningHours;
  return opening_hours[todayKey] || 'Horario no disponible';
};

const BussinesCard = ({ name, location, opening_hours, images, action }: BussinesCardProps) => {
  const todaySchedule = getTodaySchedule(opening_hours);
  // Si no se pasan imágenes o el array está vacío, se utiliza una imagen de muestra.
  const effectiveImages = Array.isArray(images) && images.length > 0
    ? images
    : 
    // ['https://picsum.photos/200/300']
    ["https://drive.usercontent.google.com/download?id=11t5CCu5XcAxUNw70Jmh_c9qWaievje6q&export=view&authuser=0"];
  const screenWidth = Dimensions.get('window').width - 20;

  return (
    <Pressable style={styles.container} onPress={action}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={[styles.imageContainer, { width: screenWidth }]}
      >
        {effectiveImages.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={[styles.image, { width: screenWidth }]}
            resizeMode="cover"
          />
        ))}
      </ScrollView>
      <View style={styles.infoContainer}>
        <Label variant="title" style={styles.title}>
          {name}
        </Label>
        <Label variant="content" style={styles.content}>
          {location}
        </Label>
        <Label variant="content" style={styles.content}>
          {todaySchedule}
        </Label>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 10,
  },
  imageContainer: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContainer: {
    padding: 10,
    marginTop: 5,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  content: {
    color: 'black',
  },
});

export default BussinesCard;
