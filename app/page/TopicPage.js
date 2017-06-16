import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import theme from '../config/theme'
import ListSeparator from '../component/ListSeparator'
import CommentItem from '../component/item/CommentItem'
import {View, Text, TouchableOpacity, Image, FlatList, RefreshControl} from 'react-native'
import * as actions from '../actions/topic'

class Topic extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
  })
  componentDidMount () {
    // const {topicId, ownerId} = this.props.navigation.state.params
    this.props.topicInit({topicId: 2, ownerId: 2})
  }
  renderHeader = (topic) => {
    return (
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{topic.name}</Text>
          <Text style={styles.follow}>关注</Text>
        </View>
        <Text style={styles.counts}>{topic.comment.num}评论 | {topic.like.num}赞</Text>
        <Text style={styles.content}>{topic.content}</Text>
        <Text style={styles.tag}>{topic.tag}</Text>
      </View>
    )
  }

  render () {
    const {topic, comments} = this.props;
    return (
      <View style={styles.container}>
        {topic && topic.name && <FlatList
          data={comments}
          renderItem={({item}) => (<CommentItem data={item}/>)}
          removeClippedSubviews={false}
          ListHeaderComponent={() => this.renderHeader(topic)}
          ItemSeparatorComponent={() => <ListSeparator/>}
          onEndReached={() => this.handleLoadingMore()}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              onRefresh={this.onRefresh}
              color="#ccc"
              refreshing={false}
            />
          }
        />}
      </View>
    )
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    padding: 12,
    borderBottomColor: theme.border.color,
    borderBottomWidth: 0.5
  },
  counts: {
    color: '#9b9b9b',
    fontSize: theme.text.smFontSize,
    marginTop: 5
  },
  titleContainer: {
    flexDirection: 'row'
  },
  title: {
    fontSize: theme.text.xlgFontSize,
    color: '#4a4a4a',
    flex: 1
  },
  content: {
    fontSize: theme.text.xlgFontSize,
    color: '#7d7d7d',
    lineHeight: 25,
    paddingTop: 13,
    paddingBottom: 13
  },
  follow: {
    fontSize: theme.text.mdFontSize,
    width: 75,
    height: 25,
    borderRadius: 2,
    lineHeight: 22,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(133, 179, 104, 0.57)'
  },
  tag: {
    backgroundColor: 'rgba(245,165,35,0.52)',
    paddingLeft: 6,
    paddingRight: 6,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 2,
    lineHeight: 18,
    width: 58,
    fontSize: theme.text.mdFontSize
  }
}

const mapStateToProps = ({topic}) => ({topic: topic.topic, comments: topic.comments})

const mapDispatchToProps = (dispatch) => (bindActionCreators(actions, dispatch))

export default connect(mapStateToProps, mapDispatchToProps)(Topic)
