import React, {Component} from 'react'
import * as WeChat from 'react-native-wechat';
import {Platform, StatusBar, TouchableOpacity, Image, View, NativeModules} from 'react-native'
import {StackNavigator, TabBarBottom, TabNavigator, TabBarTop} from 'react-navigation'
import AboutUsPage from '../page/profile/AboutUs'
import HomeFragment from '../page/HomeFragment'
import DiscoveryFrament from '../page/DiscoveryFrament'
import CollectionsFragment from '../page/CollectionsFragment'
import CropImagePage from '../page/CropImagePage'
import CareerPage from '../page/profile/CareerPage'
import CityPage from '../page/profile/CityPage'
import ProvincePage from '../page/profile/ProvincePage'
import EditProfilePage from '../page/profile/EditProfilePage'
import FeedbackPage from '../page/profile/Feedback'
import Login from '../page/login/login'
import TabBarItem from '../widget/TabBarItem'
import LabelPage from '../page/splash/LabelPage'
import NewsCenterPage from '../page/NewsCenterPage'
import LabelPageTwo from '../page/splash/LabelPageTwo'
import Splash from '../page/splash/Splash'
import PersonalCenter from '../page/profile/PersonalCenter'
import SearchPage from '../page/SearchPage'
import WriteDiaryPage from '../page/WriteDiaryPage'
import HotDiary from '../page/HotDiary'
import LightBoxPage from '../page/LightBoxPage'
import RecentDiary from '../page/RecentDiary'
import CommonWebviewPage from '../page/webview/CommonWebviewPage'
import TopicListPage from '../page/TopicListPage'
import LovedListPage from '../page/LovedListPage'
import PersonalPage from '../page/PersonalPage'
import RegisterPage from '../page/login/register'
import TrashPage from '../page/profile/Trash'
import TopicPage from '../page/TopicPage'
import DiaryDetailPage from '../page/DiaryDetailPage'
import MyFollowUsers from '../page/profile/MyFollowUsers'
import MyFollowTopics from '../page/profile/MyFollowTopics'
import CommentEditPage from '../page/CommentEditPage'
import CommentsListPage from '../page/CommentsList'
import CommentNewsPage from '../page/news/CommentNewsPage'
import NotificationPage from '../page/news/NotificationPage'
import TopicNewsPage from '../page/news/TopicNewsPage'
import UserNewsPage from '../page/news/UserNewsPage'
import SystemMessagePage from '../page/news/SystemMessagePage'
import ForgetPasswordPage from '../page/login/forget'

import theme from '../config/theme'
import AppConfig from '../constant/config.json'

class Navigation extends Component {
  constructor () {
    super()
    StatusBar.setBarStyle('default')
  }

  render () {
    return (
      <Navigator />
    )
  }
  // NativeModules.SplashScreen.getDeviceId()
  componentWillMount () {
    const wxAppId = Platform.OS === 'ios' ? AppConfig.wechat.appId.ios : AppConfig.wechat.appId.android
    WeChat.registerApp(wxAppId);
  }

  componentDidMount() {
    if (Platform.OS === 'android') {
      NativeModules.SplashScreen.hide()
    }
  }
}


const FooterTab = TabNavigator(
  {
    Recent: {
      screen: RecentDiary,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '最新'
      })
    },
    Hot: {
      screen: HotDiary,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '热门'
      })
    }
  },
  {
    tabBarComponent: TabBarTop,
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#9b9b9b',
      style: {backgroundColor: '#ffffff', paddingLeft: (theme.screenWidth - 130) / 2, paddingTop: Platform.OS === 'ios' ? 20 : 0},
      indicatorStyle: {backgroundColor: '#f89f33', marginLeft: (theme.screenWidth - 130) / 2},
      labelStyle: {fontSize: 15},
      tabStyle: {width: 65}
    }
  }
)

const MyFollowTab = TabNavigator(
  {
    Users: {
      screen: MyFollowUsers,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '用户'
      })
    },
    Hot: {
      screen: MyFollowTopics,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '话题'
      })
    }
  },
  {
    tabBarComponent: TabBarTop,
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarPosition: 'top',
    tabBarOptions: {
      activeTintColor: 'black',
      inactiveTintColor: '#9b9b9b',
      style: {backgroundColor: 'white', height: 40},
      indicatorStyle: {backgroundColor: '#f89f33'},
      tabStyle: {height: 40},
      labelStyle: {fontSize: 15}
    }
  }
)


const Tab = TabNavigator(
  {
    Home: {
      screen: HomeFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '浅记',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            name="浅记"
            label="浅记"
            normalImage={require('../img/qianyan@2x.png')}
            selectedImage={require('../img/qianyan-selected@2x.png')}
          />
        )
      })
    },
    Footer: {
      screen: FooterTab,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '足印',
        header: null,
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            name="足印"
            label="足印"
            normalImage={require('../img/zy@2x.png')}
            selectedImage={require('../img/zy-selected@2x.png')}
          />
        )
      })
    },
    Discovery: {
      screen: DiscoveryFrament,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '发现',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            name="发现"
            label="发现"
            normalImage={require('../img/find2x.png')}
            selectedImage={require('../img/find-selected@2x.png')}
          />
        )
      })
    },
    Collection: {
      screen: CollectionsFragment,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: '文集',
        tabBarIcon: ({ focused, tintColor }) => (
          <TabBarItem
            focused={focused}
            name="文集"
            label="文集"
            normalImage={require('../img/wj@2x.png')}
            selectedImage={require('../img/wenji-selected@2x.png')}
          />
        ),
      })
    }
  },
  {
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: true,
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#ffa3c4',
      inactiveTintColor: '#9b9b9b',
      style: { backgroundColor: '#ffffff' },
    }
  }
)

const Navigator = StackNavigator(
  {
    Splash: {
      screen: Splash,
      navigationOptions: {
        header: null
      }
    },
    LabelPage: {
      screen: LabelPage,
      navigationOptions: {
        header: null
      }
    },
    Login: { screen: Login,
      navigationOptions: {
        header: null
      }
    },
    LabelPageTwo: {
      screen: LabelPageTwo,
      navigationOptions: {
        header: null
      }
    },
    LightBoxPage: {
      screen: LightBoxPage,
      navigationOptions: {
        header: null
      }
    },
    Tab: {screen: Tab
    },
    SearchPage: {
      screen: SearchPage,
      mode: 'card',
      navigationOptions: {
        header: null
      }
    },
    PersonalCenter: {
      screen: PersonalCenter,
      headerMode: 'screen'
    },
    WriteDiaryPage: {
      screen: WriteDiaryPage,
      mode: 'card'
    },
    CommonWebviewPage: {
      screen: CommonWebviewPage,
      mode: 'card'
    },
    TopicListPage: {
      screen: TopicListPage,
      mode: 'card',
      navigationOptions: {
        title: '话题',
        headerStyle: {elevation: 1, backgroundColor: '#fff'}
      }
    },
    LovedListPage: {
      screen: LovedListPage,
      mode: 'card',
      navigationOptions: {
        title: '备受宠爱',
        headerStyle: {elevation: 0, backgroundColor: '#fff'}
      }
    },
    PersonalPage: {
      screen: PersonalPage,
      mode: 'card'
    },
    RegisterPage: {
      screen: RegisterPage,
      mode: 'card',
      navigationOptions: {
        header: null
      }
    },
    TrashPage: {
      screen: TrashPage,
      mode: 'card'
    },
    FeedbackPage: {
      screen: FeedbackPage,
      mode: 'card',
      navigationOptions: {
        title: '反馈意见'
      }
    },
    TopicPage: {
      screen: TopicPage,
      mode: 'card'
    },
    DiaryDetailPage: {
      screen: DiaryDetailPage,
      mode: 'card'
    },
    MyFollowPage: {
      screen: MyFollowTab,
      mode: 'card',
      navigationOptions: ({navigation}) => ({
        title: '我的关注',
        headerStyle: {elevation: 0.5, backgroundColor: '#fff'},
        headerRight: <View />,
        headerLeft: <TouchableOpacity onPress={() => { navigation.goBack() }}><Image resizeMode="contain" style={{width: 18, height: 18, marginLeft: 16}} source={theme.imgs.PageBack} /></TouchableOpacity>,
        headerTitleStyle: {alignSelf: 'center', color: theme.text.toolbarTitleColor, fontWeight: 'normal', fontSize: 18}
      })
    },
    CommentEditPage: {
      screen: CommentEditPage,
      mode: 'card'
    },
    CommentsListPage: {
      screen: CommentsListPage,
      mode: 'card'
    },
    CropImagePage: {
      screen: CropImagePage,
      mode: 'card',
      navigationOptions: {
        header: null
      }
    },
    NewsCenterPage: {
      screen: NewsCenterPage,
      mode: 'card'
    },
    AboutUsPage: {
      screen: AboutUsPage,
      mode: 'card'
    },
    TopicNewsPage: {
      screen: TopicNewsPage,
      mode: 'card',
      navigationOptions: {
        title: '话题',
        headerStyle: {elevation: 0, backgroundColor: '#fff'}
      }
    },
    NotificationPage: {
      screen: NotificationPage,
      mode: 'card',
      navigationOptions: {
        title: '通知',
        headerStyle: {elevation: 0, backgroundColor: '#fff'}
      }
    },
    UserNewsPage: {
      screen: UserNewsPage,
      mode: 'card',
      navigationOptions: {
        title: '用户',
        headerStyle: {elevation: 0, backgroundColor: '#fff'}
      }
    },
    CommentNewsPage: {
      screen: CommentNewsPage,
      mode: 'card',
      navigationOptions: {
        title: '评论',
        headerStyle: {elevation: 0, backgroundColor: '#fff'}
      }
    },
    SystemMessagePage: {
      screen: SystemMessagePage,
      mode: 'card'
    },
    EditProfilePage: {
      screen: EditProfilePage,
      mode: 'card'
    },
    CareerPage: {
      screen: CareerPage,
      mode: 'card'
    },
    CityPage: {
      screen: CityPage,
      mode: 'card'
    },
    ProvincePage: {
      screen: ProvincePage,
      mode: 'card'
    },
    ForgetPasswordPage: {
      screen: ForgetPasswordPage,
      mode: 'card'
    }
  },
  { initialRouteName: 'Splash',
    navigationOptions: {
      headerBackTitle: null,
      headerTintColor: '#333333',
      showIcon: true
    }
  }
)

export default Navigation
