import React, {Component} from 'react'
import {View, FlatList, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import PubSub from 'pubsub-js'
import theme from '../../config/theme'
import Next from '../../img/next.png'


const City = require('../../constant/city.json')

export default class CityPage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '城市',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      citys: []
    }
  }

  componentWillMount() {
    const provinceId = this.props.navigation.state.params.provinceId
    const citys = City[provinceId]
    this.setState({
      citys
    })
  }

  getLocationItem = (item) => {
    return (<TouchableOpacity style={styles.itemView} onPress={() => this._goBack(item.province + '-' + item.name)}>
      <Text style={styles.content}>{item.name}</Text>
      <Image style={styles.next} resizeMode="stretch" source={Next} />
    </TouchableOpacity>)
  }

  _routerCityPage = (provinceId) => {
    this.props.navigation.navigate('CityPage', {provinceId})
  }

  _goBack = (location) => {
    PubSub.publish('updateLocation', location)
    this.props.navigation.goBack(this.props.navigation.state.params.key)
  }

  render() {
    return (<FlatList
      removeClippedSubviews={false}
      data={this.state.citys}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={15}
      renderItem={({item}) => this.getLocationItem(item)}
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
    width: 8,
    height: 14,
    marginRight: 16,
    marginLeft: 14,
  }
})
