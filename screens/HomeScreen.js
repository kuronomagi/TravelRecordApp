import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import {
  Button,
  ButtonGroup,
  ListItem
} from 'react-native-elements';

const ALL_INDEX = 0;

const GREAT = 'sentiment-very-satisfied';
const GREAT_COLOR = 'red';
const GREAT_INDEX = 1;

const GOOD = 'sentiment-satisfied';
const GOOD_COLOR = 'orange';
const GOOD_INDEX = 2;

const POOR = 'sentiment-dissatisfied';
const POOR_COLOR = 'blue';
const POOR_INDEX = 3;

const allReviewsTmp = [
  {
    country: 'USA',
    dataFrom: 'Jan/15/2018',
    dateTo: 'Jan/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GREAT,
  },
  {
    country: 'USA',
    dataFrom: 'Feb/15/2018',
    dateTo: 'Feb/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: GOOD,
  },
  {
    country: 'USA',
    dataFrom: 'Mar/15/2018',
    dateTo: 'Mar/25/2018',
    imageURIs: [
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
      require('../assets/add_image_placeholder.png'),
    ],
    rank: POOR,
  },
]


class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  // `onPress`からの引数は`selectedReview`という名で受け止める(一旦放置。後で使用)
  onListItemPress = (selectedReview) => {
    // 'detail'に飛ばす
    this.props.navigation.navigate('detail');
  }

  renderReviews() {
    let reviewRank;

    switch (this.state.selectedIndex) {
      case GREAT_INDEX:
        reviewRank = GREAT;
        break;

      case GOOD_INDEX:
        reviewRank = GOOD;
        break;

      case POOR_INDEX:
        reviewRank = POOR;
        break;

      default:
        break;
    }

    let rankedReviews = [];
    let allReviewsTmpLength = allReviewsTmp.length;

    if (this.state.selectedIndex === ALL_INDEX) {
      rankedReviews = allReviewsTmp;
    } else {
      for (let i = 0; i < allReviewsTmpLength; i++) {
        if (allReviewsTmp[i].rank === reviewRank) {
          rankedReviews.push(allReviewsTmp[i]);
        }
      }
    }

    return (
      <ScrollView>
        {rankedReviews.map((review, index) => {

          let reviewColor;

          switch (review.rank) {
            case GREAT:
              reviewColor = GREAT_COLOR;
              break;

            case GOOD:
              reviewColor = GOOD_COLOR;
              break;

            case POOR:
              reviewColor = POOR_COLOR;
              break;

            default:
              break;
          }

            return (
              <ListItem
                key={index}
                leftIcon={{ name: review.rank, color: reviewColor }}
                title={review.country}
                subtitle={`${review.dateFrom} ~ ${review.dateTo}`}
                onPress={() => this.onListItemPress(review)}
              />
            );
          })
        }
      </ScrollView>
    );
  }

  onButtonGroupPress = (selectedIndex) => {
    this.setState({
      selectedIndex: selectedIndex
    });
  }

  render() {
    let nGreat = 0; // "Number of Great" の略
    let nGood = 0; // "Number of Good"
    let nPoor = 0; // "Number of Poor"
    let allReviewsTmpLenght = allReviewsTmp.length;

    for (let i = 0; i < allReviewsTmpLenght; i++) {
      switch (allReviewsTmp[i].rank) {
        case GREAT:
          nGreat++;
          break;

        case GOOD:
          nGood++;
          break;

        case POOR:
          nPoor++;
          break;
      }
    }

    const buttonList = [
      `All(${allReviewsTmp.length})`,
      `Great(${nGreat})`,
      `Good(${nGood})`,
      `Poor(${nPoor})`,
    ];

    return (
      <View style={{ flex: 1}}>
        <ButtonGroup
          buttons={buttonList}
          selectedIndex={this.state.selectedIndex}
          onPress={this.onButtonGroupPress}
        />

        {this.renderReviews()}
      </View>
    );
  }
}


export default HomeScreen;