import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PubSub from 'pubsub-js'
import * as actions from '../actions/message'
import theme from '../config/theme'
import PageBack from '../img/page_back.png'
import Separator from '../component/Separator'
import Next from '../img/next.png'
import TopicIcon from '../img/news_topic.png'
import UserIcon from '../img/news_user.png'
import CommentIcon from '../img/news_msg.png'
import NoticeIcon from '../img/news_notice.png'
import Reminder from '../component/Reminder'

class NewsCenterPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '消息',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}}
      onPress={() => {navigation.state.params.pageBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    this.props.mineMessageModeInit()
    this.props.navigation.setParams({
      pageBack: this._pageBack
    })
  }


  _pageBack = () => {
    let hasRed = false
    const {state} = this.props.navigation
    for (let i = 0; i < this.props.modes.length; i++) {
      if (this.props.modes[i].red_dot === 1) {
        hasRed = true
        break;
      }
    }
    state.params.callback(hasRed)
    this.props.navigation.goBack()
  }

  _routerNotificationPage = () => {
    this.props.dismissReminder(3)
    this.props.navigation.navigate('NotificationPage')
  }

  _routerCommentNewsPage = () => {
    this.props.dismissReminder(2)
    this.props.navigation.navigate('CommentNewsPage')
  }

  _routerUserNewsPage = () => {
    this.props.dismissReminder(1)
    this.props.navigation.navigate('UserNewsPage')
  }

  _routerTopicListPage = () => {
    this.props.dismissReminder(0)
    this.props.navigation.navigate('TopicListPage', {come4: 'news'})
  }


  render () {
    return (<View style={{flex: 1, backgroundColor: '#fff'}}>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={this._routerCommentNewsPage}>
        <Image source={CommentIcon} style={styles.icon}/>
        <Text style={styles.type}>评论</Text>
        {this.props.modes && this.props.modes.length === 4 && this.props.modes[2].red_dot === 1 && <Reminder />}
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={this._routerUserNewsPage}>
        <Image source={UserIcon} style={styles.icon}/>
        <Text style={styles.type}>用户</Text>
        {this.props.modes && this.props.modes.length === 4 && this.props.modes[1].red_dot === 1 && <Reminder />}
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={this._routerTopicListPage}>
        <Image source={TopicIcon} style={styles.icon}/>
        <Text style={styles.type}>话题</Text>
        {this.props.modes && this.props.modes.length === 4 && this.props.modes[0].red_dot === 1 && <Reminder />}
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={this._routerNotificationPage}>
        <Image source={NoticeIcon} style={styles.icon}/>
        <Text style={styles.type}>通知</Text>
        {this.props.modes && this.props.modes.length === 4 && this.props.modes[3].red_dot === 1 && <Reminder />}
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
    </View>)
  }

}

const mapStateToProps = ({message}) => message

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(NewsCenterPage)

const styles = StyleSheet.create({
  itemView: {
    height: 60,
    width: theme.screenWidth,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    width: 37,
    height: 37,
    marginLeft: 16
  },
  type: {
    flex: 1,
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    marginLeft: 18
  },
  next: {
    width: 8,
    height: 14,
    marginRight: 16,
    marginLeft: 14
  }
})
