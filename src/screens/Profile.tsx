import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Switch,
  StatusBar,
} from 'react-native';
import useAuthStore from '../store/authStore';
import NavigationMethods from '../utils/navigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileScreen = () => {
  const {navigateTo} = NavigationMethods();
  const {logoutUser, user} = useAuthStore();
  const [darkMode, setDarkMode] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigateTo('Login');
    } catch (err) {
      console.log(err);
    }
  };

  const ProfileOption = ({icon, title, onPress, toggleOption, isToggled}) => (
    <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
      <View style={styles.optionIconContainer}>
        <Icon name={icon} size={24} color="#4A80F0" />
      </View>
      <Text style={styles.optionText}>{title}</Text>
      <View style={styles.optionRight}>
        {toggleOption ? (
          <Switch
            value={isToggled}
            onValueChange={onPress}
            trackColor={{false: '#D1D1D6', true: '#4A80F0'}}
            thumbColor="#FFFFFF"
          />
        ) : (
          <Icon name="chevron-right" size={24} color="#A1A1A1" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Perfil</Text>
        </View>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{uri: 'https://randomuser.me/api/portraits/men/32.jpg'}}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Icon name="pencil" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.userEmail}>
            {user?.email || 'john.doe@example.com'}
          </Text>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Editar Perfil</Text>
          </TouchableOpacity>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Options */}
        <View style={styles.optionsSection}>
          <Text style={styles.sectionTitle}>Configuración</Text>

          <ProfileOption
            icon="bell-outline"
            title="Notificaciones"
            onPress={() => {}}
          />

          <ProfileOption
            icon="moon-waning-crescent"
            title="Modo Oscuro"
            toggleOption={true}
            isToggled={darkMode}
            onPress={() => setDarkMode(!darkMode)}
          />

          <ProfileOption
            icon="map-marker-outline"
            title="Mis Ubicaciones"
            onPress={() => {}}
          />

          <ProfileOption
            icon="credit-card-outline"
            title="Métodos de Pago"
            onPress={() => {}}
          />

          <ProfileOption
            icon="shield-outline"
            title="Privacidad y Seguridad"
            onPress={() => {}}
          />

          <ProfileOption
            icon="help-circle-outline"
            title="Ayuda y Soporte"
            onPress={() => {}}
          />
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon name="logout" size={20} color="#FF4C54" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>Versión 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A80F0',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B6B6B',
    marginBottom: 16,
  },
  editProfileButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4A80F0',
  },
  separator: {
    height: 8,
    backgroundColor: '#F5F5F5',
    marginVertical: 16,
  },
  optionsSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F8FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  optionRight: {
    marginLeft: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFEEEF',
    borderRadius: 12,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '500',
    color: '#FF4C54',
  },
  versionText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#A1A1A1',
    marginTop: 24,
    marginBottom: 32,
  },
});

export default ProfileScreen;
