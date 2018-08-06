import _ from 'lodash';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  Image,
  AsyncStorage,
} from 'react-native';
import { Button } from 'react-native-elements';
// import { createBottonTabNavigator } from 'react-navigation';
import { AppLoading } from 'expo';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SLIDE_DATA = [
  { title: 'Step: 1', text: 'Add your trip memory', uri: require('../assets/welcome_screen1.jpg') },
  { title: 'Step: 2', text: 'All tips on the list', uri: require('../assets/welcome_screen2.jpg') },
  { title: 'Step: 3', text: 'See the trip detail!', uri: require('../assets/welcome_screen3.jpg') },
];

class WelcomeScreen extends React.Component {
  constructor(props) { // ← おまじないの入力 props
    super(props); // ← おまじないの文 super(props);

    // `state`の`isInitialized`を`null`に初期化
    // `AsyncStorage`の'isInitialized'とはまた別物
    this.state = {
      isInitialized: null
    };
  }

  async componentWillMount() {
    // `AsyncStorage`の'isInitialized'から情報を読み込んで`isInitializedString`に保存
    let isInitializedString = await AsyncStorage.getItem('isInitialized');

    // `AsyncStorage`の'isInitialized'から読み込んだ情報が'true'だったら
    if (isInitializedString === 'true') {

      // state の方の isInitializedにtrueを上書き
      this.setState({ isInitialized: true });

      // main画面へ飛ばす
      this.props.navigation.navigate('main');

    // `AsyncStorage`の'isInitialized'から読み込んだ情報が'true'じゃなかったら
    } else {
      // `state`の方の`isInitialized`に`false`と上書き
      this.setState({ isInitialized: false });
    }
  }

  // `await`を使う関数は文頭に`async`とかく必要がある
  onStartButtonPress = async () => {

    // `AsyncStorage`に『ウェルカム画面表示済み』という情報を保存する
    // `AsyncStorage`の処理を`await`(待機)してあげる
    await AsyncStorage.setItem('isInitialized', 'true');

    //　`await`と指定された`AsyncStorage`の処理完了後に、
    // 'main'画面へ飛ばす
    this.props.navigation.navigate('main');
  }

  renderLastButton(index) {
    if(index === SLIDE_DATA.length -1) {
      return (
        <Button
          style={styles.lastButton}
          title="Let's get it starteds"
          onPress={this.onStartButtonPress}
        />
      );
    }
  }

  renderSlides() {
    return SLIDE_DATA.map((slide, index) => {
      return (
        <View key={index} style={styles.text}>

          <View style={styles.contents}>
            <Text style={styles.slideTitle}>{slide.title}</Text>
            <Text style={styles.slideText}>{slide.text}</Text>
          </View>

          <Image
            style={styles.image}
            resizeMode="contain"
            source={slide.uri}
          />

          <View style={styles.index}>
            {this.renderLastButton(index)}
            <Text style={styles.indexText}>{index + 1} / 3</Text>
          </View>
        </View>
      );
    });
  }

  render() {
    if (_.isNull(this.state.isInitialized)) {
      // もし`state`の`isInitialized`が`null`だったらいち早く`AppLoading`を描画
      // 確認用→ return <View style={{ flex: 1, backgroundColor: 'pink' }} />;
      return <AppLoading />
    }

    // もしそうじゃなかったら`ScrollView`を描画
    return (
      <ScrollView
        horizontal
        pagingEnabled
        style={{ flex: 1 }}
      >
      {this.renderSlides()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  lastButton: {
    padding: 10,
    backgroundColor: 'deepskyblue',
  },
  slideTitle: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
  slideText: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
  text: {
      flex: 1,
      backgroundColor: 'skyblue',
      width: SCREEN_WIDTH,
      alignItems: 'center',
  },
  contents: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  index: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    color: 'white',
    fontSize: 20,
    padding: 5,
  },
  image: {
    flex: 2.
  }
});

export default WelcomeScreen;

//
// ScrollView スクロール機能（Reacrt Nativeにはじめからある）
// ・`horizontal`…スクロール方向を横にする
// ・`pagingEnabled`…ヌルッ→ピタって感じで1ページごと止まるようにする
// ・`flex: 1`…描画エリアをスマホ画面上一杯を占有するようにする