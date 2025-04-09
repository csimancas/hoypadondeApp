// import React, {useState} from 'react';
// import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
// import Label from '../atoms/Label';
// import AntDesign from 'react-native-vector-icons/AntDesign';
// import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
// import DollarIconSVG from '../../../utils/svg/DollasIcon';
// import OpenTag from '../atoms/OpenTag';
// import BussinesImgCarousel from '../atoms/BussinesImgCarousel';
// import commonFunctions from '../../../utils/common';

// interface AboutBussinesProps {
//   address: {
//     street: string;
//     number: string;
//     neighborhood: string;
//     city: string;
//     state: string;
//   };
//   averageTicket: number;
//   description: string;
//   opening_hours: any;
//   images: [];
//   categories: string;
// }

// const {width} = Dimensions.get('window');
// const WeekSchedule = ({opening_hours}: {opening_hours: any}) => {
//   const {formatTime} = commonFunctions();

//   const daysOfWeekEn = [
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//     'Sunday',
//   ];

//   const daysOfWeekEs = [
//     'Lunes',
//     'Martes',
//     'Miércoles',
//     'Jueves',
//     'Viernes',
//     'Sábado',
//     'Domingo',
//   ];

//   return (
//     <View style={styles.weekScheduleContainer}>
//       {daysOfWeekEn.map((day, index) => {
//         const schedule = opening_hours[day];
//         let scheduleText = 'Cerrado';

//         if (schedule && schedule.open && schedule.close) {
//           const openTime = formatTime(schedule.open);
//           const closeTime = formatTime(schedule.close);
//           const nextDayText = schedule.nextDay
//             ? ' (Cierra al día siguiente)'
//             : '';
//           scheduleText = `${openTime} - ${closeTime}${nextDayText}`;
//         }

//         return (
//           <View key={day} style={styles.dayScheduleRow}>
//             <Label variant="content2" style={styles.dayName}>
//               {daysOfWeekEs[index]}:
//             </Label>
//             <Label variant="content2" style={styles.scheduleText}>
//               {scheduleText}
//             </Label>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const AboutBussines: React.FC<AboutBussinesProps> = ({
//   averageTicket,
//   address,
//   description,
//   opening_hours,
//   images,
//   categories,
// }) => {
//   const [showFullSchedule, setShowFullSchedule] = useState(false);
//   const {getTodaySchedule, isBusinessOpenNow} = commonFunctions();
//   const todaySchedule = getTodaySchedule(opening_hours);
//   const isOpen = isBusinessOpenNow(opening_hours);
//   const parsedAddress = `${address.street} ${address.number} ${address.neighborhood}, ${address.city}, ${address.state}`;

//   const toggleSchedule = () => {
//     setShowFullSchedule(!showFullSchedule);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.aboutBussines}>
//         <Label variant="title2" style={styles.title}>
//           Acerca del negocio
//         </Label>
//         <OpenTag open={isOpen} />
//       </View>

//       <BussinesImgCarousel img={images} />

//       <Label variant="content2" style={styles.description}>
//         {description}
//       </Label>

//       <View style={styles.scheduleContainer}>
//         <TouchableOpacity
//           style={styles.scheduleHeader}
//           onPress={toggleSchedule}>
//           <View style={styles.row}>
//             <AntDesign name="clockcircleo" size={16} color="#1A242F" />
//             <Label variant="content2" style={styles.text}>
//               {todaySchedule}
//             </Label>
//             <AntDesign
//               name={showFullSchedule ? 'up' : 'down'}
//               size={16}
//               color="#1A242F"
//             />
//           </View>
//         </TouchableOpacity>

//         {showFullSchedule && <WeekSchedule opening_hours={opening_hours} />}
//       </View>

//       <View style={styles.row}>
//         <DollarIconSVG fillColor={'#1A242F'} />
//         <Label variant="content2" style={styles.text}>
//           $ {averageTicket} / Persona
//         </Label>
//       </View>

//       <View style={styles.row}>
//         <MaterialIcon name="category" size={16} color={'#1A242F'} />
//         <Label variant="content2" style={styles.text}>
//           {categories}
//         </Label>
//       </View>

//       <View style={styles.row}>
//         <MaterialIcon name="directions" size={16} color={'#1A242F'} />
//         <Label variant="content2" style={styles.text}>
//           {parsedAddress}
//         </Label>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 10,
//     padding: 24,
//     backgroundColor: '#FFFFFF',
//   },
//   aboutBussines: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   title: {
//     color: '#1A242F',
//     fontWeight: '600',
//   },
//   image: {
//     width: width,
//     height: 210,
//     borderRadius: 20,
//   },
//   pagination: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   dot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//     backgroundColor: '#C4C4C4',
//     marginHorizontal: 4,
//   },
//   activeDot: {
//     backgroundColor: '#1A242F',
//   },
//   description: {
//     color: '#1A242F',
//     marginTop: 10,
//   },
//   row: {
//     flexDirection: 'row',
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   text: {
//     color: '#1A242F',
//     marginLeft: 5,
//     flex: 1,
//   },
//   scheduleContainer: {
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   scheduleHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   weekScheduleContainer: {
//     marginTop: 5,
//     borderTopWidth: 1,
//     borderTopColor: '#EEEEEE',
//   },
//   dayScheduleRow: {
//     flexDirection: 'row',
//     marginTop: 5,
//     justifyContent: 'space-between',
//   },
//   dayName: {
//     color: '#1A242F',
//     fontWeight: '500',
//     width: 90,
//   },
//   scheduleText: {
//     color: '#1A242F',
//     flex: 1,
//     textAlign: 'right',
//   },
// });

// export default AboutBussines;

import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import Label from '../atoms/Label';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import DollarIconSVG from '../../../utils/svg/DollasIcon';
import OpenTag from '../atoms/OpenTag';
import BussinesImgCarousel from '../atoms/BussinesImgCarousel';
import commonFunctions from '../../../utils/common';

interface AboutBussinesProps {
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  averageTicket: number;
  description: string;
  opening_hours: any;
  images: [];
  categories: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

const {width} = Dimensions.get('window');
const WeekSchedule = ({opening_hours}: {opening_hours: any}) => {
  const {formatTime} = commonFunctions();

  const daysOfWeekEn = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const daysOfWeekEs = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ];

  return (
    <View style={styles.weekScheduleContainer}>
      {daysOfWeekEn.map((day, index) => {
        const schedule = opening_hours[day];
        let scheduleText = 'Cerrado';

        if (schedule && schedule.open && schedule.close) {
          const openTime = formatTime(schedule.open);
          const closeTime = formatTime(schedule.close);
          const nextDayText = schedule.nextDay
            ? ' (Cierra al día siguiente)'
            : '';
          scheduleText = `${openTime} - ${closeTime}${nextDayText}`;
        }

        return (
          <View key={day} style={styles.dayScheduleRow}>
            <Label variant="content2" style={styles.dayName}>
              {daysOfWeekEs[index]}:
            </Label>
            <Label variant="content2" style={styles.scheduleText}>
              {scheduleText}
            </Label>
          </View>
        );
      })}
    </View>
  );
};

const AboutBussines: React.FC<AboutBussinesProps> = ({
  averageTicket,
  address,
  description,
  opening_hours,
  images,
  categories,
  coordinates,
}) => {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const {getTodaySchedule, isBusinessOpenNow} = commonFunctions();
  const todaySchedule = getTodaySchedule(opening_hours);
  const isOpen = isBusinessOpenNow(opening_hours);
  const parsedAddress = `${address.street} ${address.number} ${address.neighborhood}, ${address.city}, ${address.state}`;

  const toggleSchedule = () => {
    setShowFullSchedule(!showFullSchedule);
  };

  const openMapsApp = () => {
    if (!coordinates) {
      Alert.alert('Error', 'No hay coordenadas disponibles para este negocio');
      return;
    }

    const {latitude, longitude} = coordinates;
    const destination = `${latitude},${longitude}`;
    const label = encodeURIComponent(parsedAddress);

    const mapOptions = {
      google: {
        url: Platform.select({
          ios: `comgooglemaps://?q=${label}&center=${destination}&zoom=15`,
          android: `geo:${destination}?q=${label}`,
        }),
        appName: 'Google Maps',
      },
      waze: {
        url: `waze://?ll=${destination}&navigate=yes`,
        appName: 'Waze',
      },
      apple: {
        url: `http://maps.apple.com/?q=${label}&ll=${destination}`,
        appName: 'Apple Maps',
      },
    };

    // Verificar si Waze está instalado
    Linking.canOpenURL(mapOptions.waze.url)
      .then(wazeSupported => {
        if (wazeSupported) {
          // Mostrar opciones al usuario
          Alert.alert(
            'Abrir mapa',
            '¿Con qué aplicación deseas abrir la ubicación?',
            [
              {
                text: 'Waze',
                onPress: () => Linking.openURL(mapOptions.waze.url),
              },
              {
                text: 'Google Maps',
                onPress: () => {
                  Linking.canOpenURL(mapOptions.google.url)
                    .then(gmapsSupported => {
                      if (gmapsSupported) {
                        Linking.openURL(mapOptions.google.url);
                      } else {
                        // Abrir Maps de Apple en iOS, o enlace web en Android
                        if (Platform.OS === 'ios') {
                          Linking.openURL(mapOptions.apple.url);
                        } else {
                          Linking.openURL(
                            `https://www.google.com/maps/search/?api=1&query=${destination}`,
                          );
                        }
                      }
                    })
                    .catch(err =>
                      console.error('Error al verificar Google Maps:', err),
                    );
                },
              },
              {
                text: 'Cancelar',
                style: 'cancel',
              },
            ],
          );
        } else {
          // Si Waze no está disponible, intentamos abrir Google Maps directamente
          Linking.canOpenURL(mapOptions.google.url)
            .then(gmapsSupported => {
              if (gmapsSupported) {
                Linking.openURL(mapOptions.google.url);
              } else {
                // Si Google Maps no está disponible, abrimos el mapa por defecto
                if (Platform.OS === 'ios') {
                  Linking.openURL(mapOptions.apple.url);
                } else {
                  Linking.openURL(
                    `https://www.google.com/maps/search/?api=1&query=${destination}`,
                  );
                }
              }
            })
            .catch(err =>
              console.error('Error al verificar Google Maps:', err),
            );
        }
      })
      .catch(err => console.error('Error al verificar Waze:', err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.aboutBussines}>
        <Label variant="title2" style={styles.title}>
          Acerca del negocio
        </Label>
        <OpenTag open={isOpen} />
      </View>

      <BussinesImgCarousel img={images} />

      <Label variant="content2" style={styles.description}>
        {description}
      </Label>

      <View style={styles.scheduleContainer}>
        <TouchableOpacity
          style={styles.scheduleHeader}
          onPress={toggleSchedule}>
          <View style={styles.row}>
            <AntDesign name="clockcircleo" size={16} color="#1A242F" />
            <Label variant="content2" style={styles.text}>
              {todaySchedule}
            </Label>
            <AntDesign
              name={showFullSchedule ? 'up' : 'down'}
              size={16}
              color="#1A242F"
            />
          </View>
        </TouchableOpacity>

        {showFullSchedule && <WeekSchedule opening_hours={opening_hours} />}
      </View>

      <View style={styles.row}>
        <DollarIconSVG fillColor={'#1A242F'} />
        <Label variant="content2" style={styles.text}>
          $ {averageTicket} / Persona
        </Label>
      </View>

      <View style={styles.row}>
        <MaterialIcon name="category" size={16} color={'#1A242F'} />
        <Label variant="content2" style={styles.text}>
          {categories}
        </Label>
      </View>

      <TouchableOpacity style={styles.row} onPress={openMapsApp}>
        <MaterialIcon name="directions" size={16} color={'#1A242F'} />
        <Label variant="content2" style={[styles.text, styles.linkText]}>
          {parsedAddress}
        </Label>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  aboutBussines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    color: '#1A242F',
    fontWeight: '600',
  },
  image: {
    width: width,
    height: 210,
    borderRadius: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#1A242F',
  },
  description: {
    color: '#1A242F',
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  text: {
    color: '#1A242F',
    marginLeft: 5,
    flex: 1,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#1A242F',
  },
  scheduleContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  scheduleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekScheduleContainer: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  dayScheduleRow: {
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  dayName: {
    color: '#1A242F',
    fontWeight: '500',
    width: 90,
  },
  scheduleText: {
    color: '#1A242F',
    flex: 1,
    textAlign: 'right',
  },
});

export default AboutBussines;
