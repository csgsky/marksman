import React, {Component} from 'react'
import theme from '../../config/theme'
import {connect} from 'react-redux'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import * as actions from '../../actions/feedback'
import {bindActionCreators} from 'redux'

class Feedback extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={styles.submit}>提交</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount () {
    var that = this;
    this.props.navigation.setParams({
      handleSubmit: () => {
        if (that.state.text) {
          that.props.feedback(that.state.text)
        }
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    const oldSuccess = this.props.success;
    const {success} = nextProps;
    if (oldSuccess !== success && success) {
      this.props.navigation.goBack()
    }
  }

  componentWillUnmount() {
    this.props.clearFeedback()
  }
  render () {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          multiline
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholderTextColor="#a3a3a3"
          underlineColorAndroid="transparent"
          placeholder="我们用情在做一款产品，我们用心倾听您的建议，我们不断改善，只为更长久的与您同行！"/>
        <View style={styles.tips}>
          <Text style={styles.tip}>小提示</Text>
          <Text style={styles.tip}>如您有任何问题请与我联系或留言~</Text>
          <Text style={styles.tip}>QQ: 11111</Text>
          <Text style={styles.tip}>微信: 11111</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1
  },
  input: {
    height: 348,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 32,
    paddingLeft: 17,
    paddingRight: 17,
    paddingBottom: 32,
    color: '#a3a3a3',
    textAlignVertical: 'top',
    fontSize: 12,
    lineHeight: 20
  },
  submit: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: 18
  },
  tips: {
    position: 'absolute',
    bottom: 33,
    left: 14,
  },
  tip: {
    lineHeight: 14,
    color: '#9b9b9b',
    fontSize: 14,
  }
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
)

export default connect(({feedback}) => feedback, mapDispatchToProps)(Feedback)
