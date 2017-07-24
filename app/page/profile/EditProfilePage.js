import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView} from 'react-native'
import PubSub from 'pubsub-js'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import DateTimePicker from 'react-native-modal-datetime-picker';
import ConstellationPickerModal from '../../widget/ConstellationPickerModal'
import SexModal from '../../widget/SexModal'
import theme from '../../config/theme'
import Clear from '../../img/clear_search.png'
import Next from '../../img/next.png'
import * as actions from '../../actions/profile'
import {getYYMMDD} from '../../utils/TimeUtils'

const dismissKeyboard = require('dismissKeyboard')

class EditProfilePage extends Component {

  static navigationOptions = ({navigation}) => ({
    title: '修改资料',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity
      onPress={() => navigation.state.params.handleSubmit()}>
      <Text style={styles.save}>保存</Text>
    </TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      showDelete: false,
      info: null,
      dateTimePickerVisible: false,
      sexModalVisible: false,
      constellationVisible: false,
      itemList: ['男', '女'],
      selectedItem: 0
    }
  }

  componentWillMount() {
    const info = JSON.parse(JSON.stringify(this.props.navigation.state.params.info))
    this.setState({
      info
    })
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit
    })
    this.props.submitInitPage()
    PubSub.subscribe('updateLocation', (come4, data) => {
      this.state.info.addr = data
      this.setState({
        info: this.state.info
      })
    })
  }

  componentWillReceiveProps (nextProps) {
    const {success} = nextProps
    const oldSuccess = this.props.success
    if (oldSuccess !== success && success) {
      this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    dismissKeyboard()
    this.props.submitInitPage()
  }

  _routerToCareer = (career) => {
    this.props.navigation.navigate('CareerPage', {career,
      callback: (job) => {
        this.state.info.job = job
        this.setState({
          info: this.state.info
        })
      }})
  }
  _routerToProvince = () => {
    this.props.navigation.navigate('ProvincePage')
  }

  handleSubmit = () => {
    const info = this.state.info
    this.props.submitUserInfo({nickname: info.nickname,
      sign: info.sign,
      sex: info.sex,
      birthday: info.birthday,
      constellation: info.constellation,
      addr: info.addr,
      job: info.job
    }, this.state.info)
  }

  _hideDateTimePicker = () => {
    this.setState({
      dateTimePickerVisible: false
    })
  }

  _handleDatePicked = (date) => {
    this.state.info.birthday = getYYMMDD(date)
    this.setState({
      info: this.state.info
    })
    console.warn('A date has been picked: ', getYYMMDD(date));
    this._hideDateTimePicker();
  }

  hideConstellation = () => {
    this.setState({
      constellationVisible: false
    })
  }

  selectConstellation = (constellation) => {
    this.state.info.constellation = constellation
    this.setState({
      info: this.state.info,
      constellationVisible: false
    })
  }

  selectBoy = () => {
    this.state.info.sex = 1
    this.setState({
      sexModalVisible: false,
      info: this.state.info
    })
  }

  hideSex = () => {
    this.setState({
      sexModalVisible: false
    })
  }

  selectGirl = () => {
    this.state.info.sex = 2
    this.setState({
      sexModalVisible: false,
      info: this.state.info
    })
  }

  render () {
    return (
      <ScrollView style={styles.view}>
        <DateTimePicker
          isVisible={this.state.dateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          titleIOS="选择日期"
          cancelTextIOS="取消"
          confirmTextIOS="确定"
        />
        <ConstellationPickerModal
          isVisible={this.state.constellationVisible}
          hideConstellation={this.hideConstellation}
          selectConstellation={this.selectConstellation}
        />
        <SexModal
          isVisible={this.state.sexModalVisible}
          hideSex={this.hideSex}
          selectBoy={this.selectBoy}
          selectGirl={this.selectGirl}
        />
        <View style={styles.itemView}>
          <Text style={styles.title}>昵称</Text>
          <TextInput style={styles.nickname}
            ref="nicknameTextInput"
            underlineColorAndroid="transparent"
            maxLength={18}
            onFocus={() => {
              this.setState({
                showDelete: true
              })
            }}
            value={this.state.info.nickname}
            onChangeText={(nickname) => {
              this.state.info.nickname = nickname
              this.setState({
                info: this.state.info
              })
            }}/>
          {this.state.showDelete && <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              this.refs.nicknameTextInput.clear()
              this.setState({
                showDelete: false
              })
            }}
            style={styles.clear}>
            <Image style={{height: 16, width: 16, marginTop: 7}}
              source={Clear}/>
          </TouchableOpacity>}
        </View>
        <View style={styles.signView}>
          <Text style={[styles.title, {paddingTop: 16}]}>签名</Text>
          <TextInput style={styles.signTextInput}
            underlineColorAndroid="transparent"
            numberOfLines={3}
            multiline
            value={this.state.info.sign}
            onChangeText={(sign) => {
              this.state.info.sign = sign
              this.setState({
                info: this.state.info
              })
            }}/>
        </View>
        <TouchableOpacity style={styles.itemView} onPress={() => this.setState({sexModalVisible: true})}>
          <Text style={styles.title}>性别</Text>
          <Text style={styles.content}>{this.state.info.sex === 1 ? '男' : '女'}</Text>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemView} onPress={() => this.setState({dateTimePickerVisible: true})}>
          <Text style={styles.title}>生日</Text>
          <Text style={styles.content}>{this.state.info.birthday}</Text>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemView} onPress={() => this.setState({constellationVisible: true})}>
          <Text style={styles.title}>星座</Text>
          <Text style={styles.content}>{this.state.info.constellation}</Text>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.itemView, {marginTop: 5}]} onPress={this._routerToProvince}>
          <Text style={[styles.title, {marginRight: 16}]}>所在地</Text>
          <Text style={styles.content}>{this.state.info.addr}</Text>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.itemView} onPress={() => this._routerToCareer(this.state.info.job)}>
          <Text style={styles.title}>职业</Text>
          <Text style={styles.content}>{this.state.info.job}</Text>
          <Image style={styles.next} source={Next} />
        </TouchableOpacity>
      </ScrollView>
    )
  }
}

const mapStateToProps = ({profile}) => profile

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  save: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  },
  itemView: {
    height: 56,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  signView: {
    height: 80,
    marginTop: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16
  },
  title: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    marginRight: 28
  },
  nickname: {
    height: 40,
    flex: 1,
    color: theme.text.globalSubTextColor,
    fontSize: theme.text.xxlgFontSize,
    padding: 0,
    alignSelf: 'center'
  },
  signTextInput: {
    flex: 1,
    color: theme.text.globalSubTextColor,
    fontSize: theme.text.xxlgFontSize,
    textAlignVertical: 'top',
    padding: 0,
    marginTop: 10,
  },
  clear: {
    height: 30,
    width: 30,
    alignItems: 'center',
  },
  content: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalSubTextColor,
    flex: 1
  },
  next: {
    width: 8,
    height: 14,
    marginRight: 16,
    marginLeft: 14,
  }
})
