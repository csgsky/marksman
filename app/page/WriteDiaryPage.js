import React, {Component} from 'react'
import {StyleSheet, View, Text, ScrollView, TouchableOpacity, TextInput, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import Rx from 'rxjs'
import Moment from 'moment'
import { connect } from 'react-redux'
import * as actions from '../actions/diaryAction'
import theme from '../config/theme'
import {getDay, getYYMM, getDate} from '../utils/TimeUtils'

var dismissKeyboard = require('dismissKeyboard')

class WriteDiaryPage extends Component {

  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={styles.save}>保存</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={require('../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })
  constructor(props) {
    super(props);
    this.state = {text: '', height: 0, showPhoto: false};
  }
  componentDidMount() {
    this.props.writeDiaryInit(this.props.navigation.state.params.diary)
    this.props.navigation.setParams({
      handleSubmit: () => {
        alert('保存日记')
      }
    })
  }

  _closeKeyBoard = () => {
    dismissKeyboard()
  }
  _showPhoto = () => {
    this._closeKeyBoard()
    Rx.Observable.of('showPhoto').delay(100).subscribe(
      it => {
        this.setState({
          showPhoto: !this.state.showPhoto
        })
      }
    )
  }

  _dismissPhoto = () => {
    if (this.state.showPhoto) {
      this.setState({
        showPhoto: !this.state.showPhoto
      })
    }
  }
  render () {
    // console.warn(getDay(Moment().format()))
    // console.warn(getYYMM(Moment().format()))
    // console.warn(getDate(Moment().format()))
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={styles.view}>
          <TouchableOpacity onPress={this._closeKeyBoard} style={{height: 60, width: theme.screenWidth}}>
            <View style={styles.time}>
              <Text style={styles.day}>{getDay(Moment().format())}</Text>
              <View style={{flex: 1, flexDirection: 'column', marginLeft: 12}}>
                <Text style={styles.week}>{getDate(Moment().format())}</Text>
                <Text style={styles.year_month}>{getYYMM(Moment().format())}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TextInput
            multiline
            placeholderTextColor="#a3a3a3"
            underlineColorAndroid="transparent"
            autoFocus
            maxLength={1500}
            placeholder="今天你过得好么？"
            onChange={(event) => {
              this.setState({
                text: event.nativeEvent.text,
                height: event.nativeEvent.contentSize.height,
              });
            }}
            onFocus={this._dismissPhoto}
            style={[styles.input, {height: Math.max(35, this.state.height)}]}
            value={this.state.text}
            />
        </ScrollView>
        <View>
          <View style={{height: 40, width: theme.screenWidth, backgroundColor: 'blue'}}>
            <TouchableOpacity style={{width: 40, height: 40, backgroundColor: 'yellow'}} onPress={this._showPhoto}/>
          </View>
          {this.state.showPhoto && <View style={{height: 160, width: theme.screenWidth, backgroundColor: 'white'}} />}
        </View>
      </View>
    )
  }
}

const mapStateToProps = ({writeDiary}) => writeDiary

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(WriteDiaryPage)

const styles = StyleSheet.create({
  save: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  },
  view: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  input: {
    padding: 0,
    color: '#a3a3a3',
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 30
  },
  time: {
    flexDirection: 'row'
  },
  day: {
    color: '#f48cc3',
    fontSize: 40
  },
  week: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    paddingTop: 8
  },
  year_month: {
    color: theme.text.globalSubTextColor,
    fontSize: 13,
    marginTop: 3
  },
})
