import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native'
import * as actions from '../actions/topic'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

class Topic extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })
  componentDidMount () {
    const {topicId, ownerId} = this.props.navigation.state.params
    this.props.topicInit({topicId, ownerId})
  }
  renderHeader = () => {
    const {topic} = this.props;
    return (
      <View>
        <Text>{topic.content}</Text>
        <Text>关注</Text>
        <Text>{topic.tag}</Text>
        <Text>{topic.comment.num}评论|</Text>
        <Text>{topic.like.num}赞</Text>
      </View>
    )
  }
  render () {
    const {topic} = this.props;
    return (
      <View>
        {topic && topic.content && this.renderHeader()}
      </View>
    )
  }
}

const mapStateToProps = ({topic}) => topic

const mapDispatchToProps = (dispatch) => (bindActionCreators(actions, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
