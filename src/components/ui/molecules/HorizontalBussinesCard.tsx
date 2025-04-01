// import React from "react";
// import { View, Image, StyleSheet, Dimensions } from "react-native";
// import { Text } from "react-native-paper";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width * 0.9; // Ajustar tamaño relativo a la pantalla

// interface HorizontalBussinesCardProps {
//   image: string;
//   name: string;
//   location: string;
//   hours: string;
// }

// const HorizontalBussinesCard = ({image, name, location, hours}: HorizontalBussinesCardProps) => {

//   return (
//     <View style={styles.container}>
//       <Image
//         source={{ uri: "https://picsum.photos/200/300"}}
//         style={styles.image}
//       />
//       <View style={styles.infoContainer}>
//         <Text style={styles.name}>{name}</Text>
//         <Text style={styles.location}>{location}</Text>
//         <Text style={styles.hours}>{hours}</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     backgroundColor: "#FFFFFF",
//     width: CARD_WIDTH,
//     borderRadius: 20,
//     padding: 12,
//     alignItems: "center",
//     elevation: 5, // Sombra en Android
//     shadowColor: "#000", // Sombra en iOS
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 3 },
//     shadowRadius: 5,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     // backgroundColor: "#D9D9D9", // Color de fondo por si no hay imagen
//   },
//   infoContainer: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   name: {
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#333",
//   },
//   location: {
//     fontSize: 12,
//     color: "#666",
//   },
//   hours: {
//     fontSize: 12,
//     color: "#666",
//   },
// });

// export default HorizontalBussinesCard;

import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Text} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Importación correcta para react-native-vector-icons

const {width} = Dimensions.get('window');
const CARD_WIDTH = width * 0.9;

interface HorizontalBussinesCardProps {
  image: string;
  name: string;
  location: string;
  hours: string;
  onPress?: () => void;
  rating?: number;
}

const HorizontalBussinesCard = ({
  image,
  name,
  location,
  hours,
  onPress,
  rating = 4.5,
}: HorizontalBussinesCardProps) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.95}>
      <View style={styles.imageContainer}>
        <Image
          source={{uri: image || 'https://picsum.photos/200/300'}}
          style={styles.image}
          resizeMode="cover"
        />
        {rating && (
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>{rating}</Text>
            <MaterialIcons name="star" size={12} color="#FFD700" />
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>

        <View style={styles.detailRow}>
          <MaterialIcons name="location-on" size={14} color="#666" />
          <Text style={styles.location} numberOfLines={1} ellipsizeMode="tail">
            {location}
          </Text>
        </View>

        <View style={styles.detailRow}>
          <MaterialIcons name="access-time" size={14} color="#666" />
          <Text style={styles.hours}>{hours}</Text>
        </View>

        <View style={styles.statusBadge}>
          <Text style={styles.statusText}>Abierto ahora</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: CARD_WIDTH,
    borderRadius: 16,
    padding: 12,
    marginVertical: 8,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.03)',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
  },
  ratingBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    marginRight: 2,
  },
  infoContainer: {
    marginLeft: 16,
    flex: 1,
    justifyContent: 'space-between',
    height: 90,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    flex: 1,
  },
  hours: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E6F7ED',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 4,
  },
  statusText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: '500',
  },
});

export default HorizontalBussinesCard;
