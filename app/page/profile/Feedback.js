import React, {Component} from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import {bindActionCreators} from 'redux'
import Toast from 'react-native-root-toast'
import {connect} from 'react-redux'
import theme from '../../config/theme'
import * as actions from '../../actions/feedback'

class Feedback extends Component {
  static navigationOptions = ({navigation}) => ({
    headerStyle: {elevation: 0.3, backgroundColor: '#fff'},
    headerRight: <TouchableOpacity onPress={() => navigation.state.params.handleSubmit()}><Text style={styles.submit}>提交</Text></TouchableOpacity>,
    headerLeft: <TouchableOpacity style={{width: 40, height: 40, justifyContent: 'center', alignItems: 'center'}} onPress={() => {navigation.goBack()}}><Image resizeMode ='contain' style={{width: 18, height: 18, marginLeft: 16}} source={require('../../img/page_back.png')} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  constructor (props) {
    super(props)
    this.state = {
      text: ''
    }
  }

  componentDidMount () {
    const that = this;
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
      Toast.show('提交成功，小编正快马加鞭解决问题~', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        onShow: () => {
        // calls on toast\`s appear animation start
        },
        onShown: () => {
        // calls on toast\`s appear animation end.
        },
        onHide: () => {
        // calls on toast\`s hide animation start.
        },
        onHidden: () => {
        // calls on toast\`s hide animation end.
        }
      })
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
          <Text style={styles.tip}>联系我们: qianyanapp@gmail.com</Text>
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
    height: theme.screenHeight - 156,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    paddingTop: 14,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 32,
    color: '#a3a3a3',
    textAlignVertical: 'top',
    fontSize: 16,
    lineHeight: 22
  },
  submit: {
    color: '#c37f2e',
    marginRight: 18,
    fontSize: theme.text.xxlgFontSize
  },
  tips: {
    marginTop: 8,
    marginLeft: 16
  },
  tip: {
    lineHeight: 20,
    color: '#9b9b9b',
    fontSize: 16,
  }
})

const mapDispatchToProps = (dispatch) => (
  bindActionCreators(actions, dispatch)
)

export default connect(({feedback}) => feedback, mapDispatchToProps)(Feedback)
