import {createStackNavigator} from 'react-navigation'
import MainScreen from "../Screens/MainScreen";

const PrimaryNav = createStackNavigator({
    MainScreen: {
        screen: MainScreen,
        navigationOptions: ({}) => ({
            header: null
        }),
    }
}, {
    initialRouteName: 'MainScreen',
    navigationOptions: {
        header: null
    }
});

export default PrimaryNav;
