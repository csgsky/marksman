import React, {Component} from 'react'
import {View, Image, Text, StyleSheet, TouchableOpacity, NativeModules, ActivityIndicator} from 'react-native'
import theme from '../config/theme'
import One from '../img/diary_material_one.jpg'
import Two from '../img/diary_material_two.jpg'
import Three from '../img/diary_material_three.jpg'
import Four from '../img/diary_material_four.jpg'
import Five from '../img/diary_material_five.jpg'
import Six from '../img/diary_material_six.jpg'
import Seven from '../img/diary_material_seven.jpg'
import Eight from '../img/diary_material_eight.jpg'
import Nine from '../img/diary_material_nine.jpg'
import Ten from '../img/diary_material_ten.jpg'
import tool from '../img/lightbox_toolbar.png'
import * as consts from '../utils/const'

export default class LightBoxPage extends Component {

  constructor (props) {
    super(props)
    this.state = {
      showToolbg: false,
      loading: true
    }
  }

  componentWillMount () {
    const {state} = this.props.navigation
    if (this.isMaterialImg(state.params.img)) {
      this.setState({
        showToolbg: false
      })
    } else {
      Image.getSize(state.params.imgR, (width, height) => {
        // alert('imgHeiget: ' + (height / width) + ' scrrenHeiget: ' + (theme.screenHeight / theme.screenWidth))
        if ((height / width) + 0.2 > (theme.screenHeight / theme.screenWidth)) {
          this.setState({
            showToolbg: true
          })
        }
      })
    }
  }

  getActivityIndicator = () => (<TouchableOpacity activeOpacity={1}
    onPress={this.back}
    style={{
      position: 'absolute', bottom: 0, top: 0, left: 0, right: 0, backgroundColor: 'transparent', justifyContent: 'center'
    }}>
    <ActivityIndicator size="large"/>
  </TouchableOpacity>)

  getSource = (img, imgR) => {
    if (img === '0') {
      return One
    } else if (img === '1') {
      return Two
    } else if (img === '2') {
      return Three
    } else if (img === '3') {
      return Four
    } else if (img === '4') {
      return Five
    } else if (img === '5') {
      return Six
    } else if (img === '6') {
      return Seven
    } else if (img === '7') {
      return Eight
    } else if (img === '8') {
      return Nine
    } else if (img === '9') {
      return Ten
    }
    return {uri: imgR}
  }

  getSourceImg = (img, imgR) => {
    if (img === '0') {
      return consts.materialPhotos[0]
    } else if (img === '1') {
      return consts.materialPhotos[1]
    } else if (img === '2') {
      return consts.materialPhotos[2]
    } else if (img === '3') {
      return consts.materialPhotos[3]
    } else if (img === '4') {
      return consts.materialPhotos[4]
    } else if (img === '5') {
      return consts.materialPhotos[5]
    } else if (img === '6') {
      return consts.materialPhotos[6]
    } else if (img === '7') {
      return consts.materialPhotos[7]
    } else if (img === '8') {
      return consts.materialPhotos[8]
    } else if (img === '9') {
      return consts.materialPhotos[9]
    } else if (img === '10') {
      return consts.materialPhotos[10]
    }
    return imgR
  }


  isMaterialImg = (img) => {
    if (img === '0') {
      return true
    } else if (img === '1') {
      return true
    } else if (img === '2') {
      return true
    } else if (img === '3') {
      return true
    } else if (img === '4') {
      return true
    } else if (img === '5') {
      return true
    } else if (img === '6') {
      return true
    } else if (img === '7') {
      return true
    } else if (img === '8') {
      return true
    } else if (img === '9') {
      return true
    }
    return false
  }

  save = () => {
    const {img, imgR} = this.props.navigation.state.params
    if (img) {
      // console.log('save img')
      // console.log(NativeModules.SplashScreen.saveImg)
      NativeModules.SplashScreen.saveImg(this.getSourceImg(img, imgR))
    }
  }

  back = () => {
    this.props.navigation.goBack()
  }

  render () {
    const {state} = this.props.navigation
    return (<TouchableOpacity style={styles.view} activeOpacity={1} onPress={this.back}>
      <Image style={styles.img}
        onLoad={() => this.setState({loading: false})}
        resizeMode="contain"
        source={this.getSource(state.params.img, state.params.imgR)} />

      {this.state.showToolbg && <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 40, backgroundColor: 'transparent'}}>
        <Image source={tool}/>
      </View>}
      <View style={{position: 'absolute', bottom: 0, right: 0, left: 0, height: 40, alignItems: 'flex-end', justifyContent: 'center'}}>
        {!this.state.loading && <TouchableOpacity onPress={this.save} style={{width: 50, height: 40, marginRight: 10, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: 'white', backgroundColor: 'transparent'}}>保存</Text>
        </TouchableOpacity>}
      </View>
      {this.state.loading && this.getActivityIndicator()}
    </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'black',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    width: theme.screenWidth,
    height: theme.screenHeight
  }
})
