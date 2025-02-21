import { useNavigation } from "@react-navigation/native";

const NavigationMethods = () => {
    const navigation = useNavigation();

    const navigateTo = (screen: string) => {
        navigation.navigate(screen as never);
    };

    const navigateWithParams = (screen: string, params: object) => {
        navigation.navigate(screen as never, params as never);
    };

    const goBack = () => {
        navigation.goBack();
    };

    return {
        navigateTo,
        navigateWithParams,
        goBack,
    };
};

export default NavigationMethods;
