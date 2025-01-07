import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
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
  image: string;
};

const getTodaySchedule = (opening_hours: OpeningHours): string => {
  // Obtener el día actual en español
  const daysOfWeek = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
  const today = new Date().getDay(); // 0 es domingo, 1 es lunes, etc.
  const todayKey = daysOfWeek[today] as keyof OpeningHours;

  // Retornar el horario del día actual
  return opening_hours[todayKey] || 'Horario no disponible';
};

const BussinesCard = ({ name, location, opening_hours, image }: BussinesCardProps) => {
  // Obtener el horario del día actual
  const todaySchedule = getTodaySchedule(opening_hours);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="cover"
      />
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
    </View>
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
  image: {
    width: '100%',
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
