import { useNavigation} from '@react-navigation/native';


const NavigationMethods = () => {
    const navigation = useNavigation();

    const navigateTo = (screen: string) => {
        navigation.navigate(screen);
    };

    const goBack = () => {
        navigation.goBack();
    };



    return {
        navigateTo,
        goBack,
    };
}

export default NavigationMethods;
