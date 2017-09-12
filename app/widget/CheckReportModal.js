import React, { Component } from 'react'
import {Modal, TouchableOpacity, Text, View, StyleSheet, Image} from 'react-native'
import CheckBox from 'react-native-check-box'
import theme from '../config/theme'
import check from '../img/report_check.png'
import unCheck from '../img/report_uncheck.png'

export default class CheckReportModal extends Component {

  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  // onViewShow = () => {
  //   this.setState({
  //     index: 0
  //   })
  // }

  check = (index) => {
    this.setState({
      index
    })
  }

  render() {
    return (
      <Modal
        visible={this.props.visible}
        animationType={'fade'}
        transparent>
        <TouchableOpacity activeOpacity={1} style={styles.bg}>
          <View style={{width: theme.screenWidth - 100, backgroundColor: 'white', borderRadius: 6}}>
            <View style={{padding: 18}}>
              <Text style={{fontSize: theme.text.xxlgFontSize}}>请选择举报类型：</Text>
              <View style={{flexDirection: 'row', height: 50}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <CheckBox
                    style={{width: 150}}
                    onClick={() => this.check(0)}
                    isChecked={this.state.index === 0 ? true : false}
                    rightText="广告"
                    rightTextStyle={{fontSize: 15, color: '#4a4a4a'}}
                    checkedImage={<Image source={check} style={{width: 18, height: 18}}/>}
                    unCheckedImage={<Image source={unCheck} style={{width: 18, height: 18}}/>}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <CheckBox
                    style={{width: 150}}
                    onClick={() => this.check(1)}
                    isChecked={this.state.index === 1 ? true : false}
                    rightText="色情"
                    rightTextStyle={{fontSize: 15, color: '#4a4a4a'}}
                    checkedImage={<Image source={check} style={{width: 18, height: 18}}/>}
                    unCheckedImage={<Image source={unCheck} style={{width: 18, height: 18}}/>}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', height: 50}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <CheckBox
                    style={{width: 150}}
                    onClick={() => this.check(2)}
                    isChecked={this.state.index === 2 ? true : false}
                    rightText="反动"
                    rightTextStyle={{fontSize: 15, color: '#4a4a4a'}}
                    checkedImage={<Image source={check} style={{width: 18, height: 18}}/>}
                    unCheckedImage={<Image source={unCheck} style={{width: 18, height: 18}}/>}
                  />
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <CheckBox
                    style={{width: 150}}
                    onClick={() => this.check(3)}
                    isChecked={this.state.index === 3 ? true : false}
                    rightText="抄袭"
                    rightTextStyle={{fontSize: 15, color: '#4a4a4a'}}
                    checkedImage={<Image source={check} style={{width: 18, height: 18}}/>}
                    unCheckedImage={<Image source={unCheck} style={{width: 18, height: 18}}/>}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row', height: 50}}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <CheckBox
                    style={{width: 350}}
                    onClick={() => this.check(4)}
                    isChecked={this.state.index === 4 ? true : false}
                    rightText="其他（人身攻击、不实信息等）"
                    rightTextStyle={{fontSize: 14, color: '#4a4a4a'}}
                    checkedImage={<Image source={check} style={{width: 18, height: 18}}/>}
                    unCheckedImage={<Image source={unCheck} style={{width: 18, height: 18}}/>}
                  />
                </View>
              </View>
            </View>
            <View style={{backgroundColor: '#cfcfcf', height: 0.4}} />
            <View style={{flexDirection: 'row', height: 50}}>
              <TouchableOpacity style={{flex: 1, justifyContent: 'center', alignItems: 'center'}} onPress={this.props.hideCheckReport}>
                <Text style={{fontSize: theme.text.xxlgFontSize, color: '#9b9b9b'}}>取消</Text>
              </TouchableOpacity>
              <View style={{width: 0.5, height: 50, backgroundColor: '#cfcfcf'}} />
              <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={() => {
                this.props.confirmReport(this.state.index)
                this.setState({
                  index: 0
                })
              }}>
                <Text style={{fontSize: theme.text.xxlgFontSize, color: '#2d4896'}}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  bg: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,52,52,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reporter: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  cancelItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'white'
  }
})
