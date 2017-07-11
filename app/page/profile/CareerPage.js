import React, {Component} from 'react'
import {View, FlatList, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import theme from '../../config/theme'
import Check from '../../img/career_check.png'
import UnCheck from '../../img/career_uncheck.png'

export default class CareerPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '职业',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    const value = this.props.navigation.state.params.career
    this.state = {
      careers: [
        {name: '管理'},
        {name: '医疗'},
        {name: '金融'},
        {name: '互联网'},
        {name: '教育'},
        {name: '传媒'},
        {name: '学生'},
        {name: '自由职业者'},
        {name: '其他'}],
      currentValue: value
    }
  }

  getCareerItem = (item, index) => {
    return (<TouchableOpacity style={styles.itemView} onPress={() => this._setValue(item.name)}>
      <Text style={styles.content}>{item.name}</Text>
      <Image style={styles.next} resizeMode="stretch" source={item.name === this.state.currentValue ? Check : UnCheck} />
    </TouchableOpacity>)
  }

  _setValue = (currentValue) => {
    const {state} = this.props.navigation
    state.params.callback(currentValue)
    this.props.navigation.goBack()
  }

  render() {
    return (<FlatList
      removeClippedSubviews={false}
      data={this.state.careers}
      showsHorizontalScrollIndicator={false}
      renderItem={({item, index}) => this.getCareerItem(item, index)}
      />
    )
  }
}

const styles = StyleSheet.create({
  itemView: {
    height: 56,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  content: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    flex: 1
  },
  next: {
    width: 18,
    height: 13,
    marginRight: 16,
    marginLeft: 14,
  }
})
