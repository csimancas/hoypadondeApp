import { useNavigation} from '@react-navigation/native';


const NavigationMethods = () => {
    const navigation = useNavigation();

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    };




    return {
        navigateTo,
    };
}

export default NavigationMethods;
