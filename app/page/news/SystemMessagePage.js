import React, {Component} from 'react'
import {TouchableOpacity, RefreshControl, StyleSheet, FlatList, View, Text, Image} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '../../actions/message'
import theme from '../../config/theme'
import ListSeparator from '../../component/ListSeparator'
import {getDotYYMMDD} from '../../utils/TimeUtils'
import Sepatator from '../../component/Separator'
import Footer from '../../component/Footer'

class SystemMessagePage extends Component {
  static navigationOptions = ({navigation}) => ({
    title: '系统通知',
    headerStyle: {elevation: 0, backgroundColor: '#fff'},
    headerRight: <View />,
    headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
    headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
  })

  componentDidMount() {
    this.props.profileMessageReminder({page: 0})
  }

  onRefresh = () => {
    this.props.profileMessageReminder({page: 0})
  }

  getItemSeparator = () => <ListSeparator />


  handleLoadingMore = () => {
    const {isLoadingMore, hasMoreData, page} = this.props
    if (hasMoreData && !isLoadingMore) {
      this.props.profileMessageReminderMore({page})
    }
  }

  renderLoadMoreFooter = () => {
    const {hasMoreData, sysmsgs} = this.props
    if (sysmsgs.length > 0) {
      return <Footer hasMoreData={hasMoreData}/>
    }
    return <View />
  }


  renderListItem = (item) => {
    return (<TouchableOpacity style={styles.itemView}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.date}>{getDotYYMMDD(item.create_time)}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </TouchableOpacity>)
  }

  render () {
    return (<View style={styles.view}>
      <Sepatator />
      <FlatList
        removeClippedSubviews={false}
        data={this.props.sysmsgs}
        ItemSeparatorComponent={this.getItemSeparator}
        renderItem={({item}) => this.renderListItem(item)}
        onEndReachedThreshold={0.1}
        onEndReached={this.handleLoadingMore}
        ListFooterComponent={this.renderLoadMoreFooter}
        refreshControl={
          <RefreshControl
            onRefresh={this.onRefresh}
            color="#ccc"
            refreshing={false}
          />
         }
      />
    </View>)
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: theme.pageBackgroundColor
  },
  itemView: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: 'white'
  },
  content: {
    fontSize: theme.text.xxlgFontSize,
    color: theme.text.globalTextColor,
    flex: 1,
    marginTop: 15,
    marginBottom: 15
  },
  name: {
    fontSize: theme.text.xxlgFontSize,
    color: '#c37f2e',
    marginTop: 15
  },
  date: {
    fontSize: theme.text.mdFontSize,
    color: '#6a6a6a',
    marginTop: 8
  }
})


const mapStateToProps = ({message}) => message

const mapDispatchToProps = dispatch => (
  bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(SystemMessagePage)

