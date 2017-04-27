'use strict'

import React, {Component} from 'react'
import {View, StyleSheet, Image, Text} from 'react-native'
import HomeFragment from '../page/HomeFragment'
import TabNavigator from 'react-native-tab-navigator';
import MeFragment from '../page/MeFragment'
import SocietyFragment from '../page/SocietyFragment'
import RaceFragment from '../page/RaceFragment'
import px2dp from '../utils/px2dp';
export default class TabBar extends Component {

  static defaultProps = {
        selectedColor: '#FF5000',
        normalColor: '#a9a9a9'
  };

  constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'home',
            tabName: ['首页','比赛','动态','我的']
        }
    }
    render() {
        const {selectedColor} = this.props;
        const {tabName} = this.state;
        return(
            <TabNavigator
                hidesTabTouch={true}
                tabBarStyle={styles.tabbar}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={require('../img/main_tab_home.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={require('../img/main_tab_home_click.png')} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'race'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={require('../img/main_tab_match.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={require('../img/main_tab_match_click.png')} />}
                    onPress={() => this.setState({ selectedTab: 'race' })}>
                    {<RaceFragment />}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[2]}
                    selected={this.state.selectedTab === 'society'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={require('../img/main_tab_feed.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={require('../img/main_tab_feed_selected.png')} />}
                    onPress={() => this.setState({ selectedTab: 'society' })}>
                    {<SocietyFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[3]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab} source={require('../img/main_tab_me.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tab} source={require('../img/main_tab_me_click.png')} />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<MeFragment navigator={this.props.navigator}/>}
                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount() {
        
    }
}
const styles = StyleSheet.create({
    tabbar: {
        height: px2dp(49),
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    tabStyle:{
        paddingTop: px2dp(2)
    },
    tab: {
        width: px2dp(22),
        height: px2dp(22)
    }
});
