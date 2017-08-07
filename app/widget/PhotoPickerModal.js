import React, { Component } from 'react'
import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    Image,
    Platform,
    StatusBar
} from 'react-native'
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
import ChooseUp from '../img/choose_up.png'
import Choose from '../img/choose.png'

export default class PhotoPickerModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      material: [
        {img: One},
        {img: Two},
        {img: Three},
        {img: Four},
        {img: Five},
        {img: Six},
        {img: Seven},
        {img: Eight},
        {img: Nine},
        {img: Ten}]}
  }

  render () {
    return (
      <Modal
        visible={this.props._dialogVisible}
        transparent
        aanimationType={'fade'}
        onRequestClose={() => {}}>
        <TouchableOpacity activeOpacity={1} style={styles.bg} onPress={this.props.hide}>
          <TouchableOpacity activeOpacity={1} style={styles.dialog}>
            <TouchableOpacity activeOpacity={1} style={styles.launchCameraItem} onPress={this.props.launchCamera}>
              <Text style={{fontSize: theme.text.xxlgFontSize, color: '#4a4a4a'}}>拍照</Text>
            </TouchableOpacity>
            <View style={{height: 0.5, backgroundColor: '#f8f8f8'}} />
            <TouchableOpacity activeOpacity={1} style={styles.launchImageLibraryItem} onPress={this.props.launchImageLibrary}>
              <Text style={{fontSize: theme.text.xxlgFontSize, color: '#4a4a4a'}}>从手机相册选择</Text>
            </TouchableOpacity>
            <View style={{height: 0.5, backgroundColor: '#f8f8f8'}} />
            {this.props.selectMaterial && <FlatList
              style={{backgroundColor: 'white'}}
              horizontal
              removeClippedSubviews={false}
              data={this.state.material}
              showsHorizontalScrollIndicator={false}
              renderItem={this.renderMaterialItem}
            />}
            <TouchableOpacity activeOpacity={1} style={styles.cancelItem} onPress={this.props.hide}>
              <Text style={{fontSize: theme.text.xxlgFontSize, color: '#4a4a4a'}}>取消</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    )
  }

  renderMaterialItem = ({item, index}) => (<TouchableOpacity activeOpacity={1} style={styles.materialItem} onPress={() => this.props.selectMaterial(index)}>
    <View style={{width: 115, height: 75}}>
      <Image style={{width: 115, height: 75}} source={item.img} resizeMode="cover"/>
      <Image style={{position: 'absolute', width: 17, height: 17, right: 6, top: 6}} source={this.getSource(index)} />
    </View>
  </TouchableOpacity>)

  getSource = (index) => {
    if (index === this.props.materialPosition) {
      return ChooseUp
    }
    return Choose
  }
}

const styles = StyleSheet.create({
  bg: {
    width: theme.screenWidth,
    height: theme.screenHeight,
    flexDirection: 'column',
    backgroundColor: 'rgba(52,52,52,0.7)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dialog: {
    width: theme.screenWidth,
    marginBottom: (Platform.OS === 'ios') ? 0 : StatusBar.currentHeight
  },
  materialItem: {
    width: 115,
    marginBottom: 10,
    marginTop: 10,
    backgroundColor: 'white',
    marginLeft: 10
  },
  cancelItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6,
    backgroundColor: 'white'
  },
  launchCameraItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  launchImageLibraryItem: {
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})
