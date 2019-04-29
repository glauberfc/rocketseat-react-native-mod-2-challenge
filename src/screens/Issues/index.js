import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Linking,
} from 'react-native'

import api from '#/services/api'
import ListItem from '#/components/ListItem'
import { general } from '#/styles'

import FiltersTab from '#/components/FiltersTab'

export default class Issues extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
    }).isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
  })

  state = {
    issues: [],
    loading: false,
    error: false,
    filters: {
      active: 'all',
      data: [
        {
          id: 'all',
          name: 'All',
        },
        {
          id: 'open',
          name: 'Open',
        },
        {
          id: 'closed',
          name: 'Closed',
        },
      ],
    },
  }

  componentDidMount() {
    this.requestIssues()
  }

  openIssueLink = async url => {
    await Linking.openURL(url)
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.openIssueLink(item.html_url)}>
      <ListItem
        key={item.id}
        avatar={item.user.avatar_url}
        header={item.title}
        subheader={item.user.login}
      />
    </TouchableOpacity>
  )

  requestIssues = async (filterId = 'all') => {
    this.setState(state => ({
      loading: true,
      filters: { ...state.filters, active: filterId },
    }))

    const { navigation } = this.props
    const name = navigation.getParam('name')
    const organization = navigation.getParam('organization')

    try {
      const { data } = await api.get(
        `/repos/${organization}/${name}/issues?state=${filterId}`
      )

      this.setState({ issues: data, loading: false })
    } catch (error) {
      this.setState({
        error: true,
        loading: false,
      })
    }
  }

  render() {
    const { issues, loading, error, filters } = this.state

    return (
      <View style={general.screenContainer}>
        <FiltersTab filters={filters} onPressFilter={this.requestIssues} />

        {loading && (
          <View style={general.centralizerContainer}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {error && (
          <View style={general.centralizerContainer}>
            <Text>Error trying to request the issues</Text>
          </View>
        )}

        {!loading && !error && (
          <FlatList
            data={issues}
            keyExtractor={item => String(item.id)}
            renderItem={this.renderItem}
          />
        )}
      </View>
    )
  }
}
