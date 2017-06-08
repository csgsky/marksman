import React, { Component } from 'react'
import {View, TextInput, TouchableOpacity, Image, StyleSheet, Text} from 'react-native'
import {stringTrim} from '../utils/viewHelper'
import Rx from 'rxjs'
export default class SearchTextInput extends Component {
  render () {
    const {
      searchInputClearShow, searchTextChange, title, backPress, searchText, onSubmitEditing
    } = this.props
    return (
      <View
        style={styles.toolbar}>
        <View style={styles.backView}>
            <Image style={{height: 16, width: 16, marginLeft: 10}}
                    source={require('../img/search@3x.png')}/>
            <TextInput
              ref="searchTextInput"
              style={styles.textInput}
              underlineColorAndroid="transparent"
              textAlignVertical="top"
              placeholderTextColor="#ababab"
              multiline={false}
              autoFocus={true}
              returnKeyType="search"
              placeholder={title}
              onSubmitEditing={() => {
                let value = stringTrim(searchText)
                if (value && value.length > 0) {
                  onSubmitEditing()
                } else {
                  Rx.Observable.of('refresh')
                    .delay(400)
                    .subscribe(it => {
                      this.refs.searchTextInput.focus()
                    })
                }
              }}
              onChangeText={(text) => searchTextChange(text)}
            />
            {searchInputClearShow
            ? <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  this.refs.searchTextInput.clear()
                  this.refs.searchTextInput.focus()
                }}
                style={{
                  height: 30,
                  width: 30,
                  alignSelf: 'center',
                  alignItems: 'center'
                }}>
                <Image style={{height: 16, width: 16, marginTop: 7}}
                    source={require('../img/clear_search@3x.png')}/>
            </TouchableOpacity>
            : null}
          </View>
          <TouchableOpacity activeOpacity={0.8}
                          onPress={backPress}
                          style={styles.cancelStyle}>
          <Text style={styles.cancelText}>{'取消'}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    height: 55
  },
  backView: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#dcdddd'
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    height: 38,
    flexDirection: 'column',
    justifyContent: 'center',
    color: '#313131',
    marginLeft: 10
  },
  cancelStyle: {
    height: 30
  },
  cancelText: {
    height: 30,
    width: 50,
    color: '#c37f2e',
    fontSize: 16,
    textAlign: 'left',
    lineHeight: 25
  }
})
