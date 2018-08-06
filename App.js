import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  StatusBar
} from 'react-native';
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation';

import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import AddScreen from './screens/AddScreen';
import ProfileScreen from './screens/ProfileScreen';
import Setting1Screen from './screens/Setting1Screen';
import Setting2Screen from './screens/Setting2Screen';

export default class App extends React.Component {
  render() {

    // `await`を使う関数は文頭に`async`とかく必要がある
    onStartButtonPress = async () => {

      // `AsyncStorage`に『ウェルカム画面表示済み』という情報を保存する
      // `AsyncStorage`の処理を`await`(待機)してあげる
      await AsyncStorage.setItem('isInitialized', 'ture');

      //　`await`と指定された`AsyncStorage`の処理完了後に、
      // 'main'画面へ飛ばす

      this.props.navigation.navigate('main');
    }

    // headernavオプション
    const headerNavigationOptions = {
      headerStyle: {
        backgroundColor: 'deepskyblue',
        marginTop: (Platform.OS === 'android' ? 24 : 0)
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerTintColor: 'white'
    };

    // HomeStackについて
    const HomeStack = createStackNavigator({
      home: {
        screen: HomeScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Home'
        }
      },
      detail: {
        screen: DetailScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Detail',
        }
      }
    });

    // AddStackについて
    const AddStack = createStackNavigator({
      add: {
        screen: AddScreen,
        navigationOptions: {
          header: null
        }
      }
    });

    // ProfileStackについて
    const ProfileStack = createStackNavigator({
      profile: {
        screen: ProfileScreen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Treco',
          headerBackTitle: 'Profile',
        }
      },
      setting1: {
        screen: Setting1Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 1',
        },
      },
      setting2: {
        screen: Setting2Screen,
        navigationOptions: {
          ...headerNavigationOptions,
          headerTitle: 'Setting 2',
        }
      }
    });

    //
    ProfileStack.navigationOptions = ({ navigation }) => {
      return {
        tabBarVisible: (navigation.state.index === 0)
      };
    };

    // 0階層目以外（全階層）はタブを隠す
    const MainTab = createBottomTabNavigator ({
      homeStack: {
        screen: HomeStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/home.png')}
            />
          ),
          title: 'Home'
        }
      },
      addStack: {
        screen: AddStack,
        navigationOptions: {
          tabBarIcon: () => (
            <Image
              style={{ height: 60, width: 60, tintColor: 'deepskyblue' }}
              source={require('./assets/add.png')}
            />
          ),
          title: '',
        }
      },
      profileStack: {
        screen: ProfileStack,
        navigationOptions: {
          tabBarIcon: ({ tintColor }) => (
            <Image
              style={{ height: 25, width: 25, tintColor: tintColor }}
              source={require('./assets/profile.png')}
            />
          ),
          title: 'Profile'
        }
      }
    }, {
      swipeEnabled: false,
    });

    // WelcomeScreenとMainTabを繋げてNavigatorTabに
    const NavigatorTab = createBottomTabNavigator({
      welcom: { screen: WelcomeScreen },
      main: { screen: MainTab }
    }, {
      navigationOptions: { tabBarVisible: false }
    });


    // NavigatorTabを描画
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigatorTab />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  }
});
