import React, {Component} from 'react'
import {View, TouchableOpacity, Text, Image, StyleSheet} from 'react-native'
import theme from '../config/theme'
import PageBack from '../img/page_back.png'
import Separator from '../component/Separator'
import Next from '../img/next.png'
import TopicIcon from '../img/news_topic.png'
import UserIcon from '../img/news_user.png'
import CommentIcon from '../img/news_msg.png'
import NoticeIcon from '../img/news_notice.png'

export default class NewsCenterPage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '消息',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  render () {
    return (<View style={{backgroundColor: 'white'}}>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('TopicNewsPage')}>
        <Image source={TopicIcon} style={styles.icon}/>
        <Text style={styles.type}>话题</Text>
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('UserNewsPage')}>
        <Image source={UserIcon} style={styles.icon}/>
        <Text style={styles.type}>用户</Text>
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('CommentNewsPage')}>
        <Image source={CommentIcon} style={styles.icon}/>
        <Text style={styles.type}>评论</Text>
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
      <TouchableOpacity style={styles.itemView} activeOpacity={0.8} onPress={() => this.props.navigation.navigate('NotificationPage')}>
        <Image source={NoticeIcon} style={styles.icon}/>
        <Text style={styles.type}>通知</Text>
        <Image style={styles.next} source={Next} />
      </TouchableOpacity>
      <Separator />
    </View>)
  }

}

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
    marginRight: 16
  }
})
