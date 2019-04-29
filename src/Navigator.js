import React from 'react'
import { createAppContainer, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome'

import Home from '#/screens/Home'
import Issues from '#/screens/Issues'
import { metrics, colors } from './styles'

const AppNavigator = createStackNavigator(
  {
    Home,
    Issues,
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      headerTintColor: colors.darker,
      headerBackImage: ({ tintColor }) => (
        <Icon name="angle-left" size={30} color={tintColor} />
      ),
      headerLeftContainerStyle: {
        paddingHorizontal: metrics.basePadding,
      },
    },
    headerBackTitleVisible: false,
  }
)

export default createAppContainer(AppNavigator)
