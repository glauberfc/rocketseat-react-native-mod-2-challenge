import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'

import styles from './styles'
import api from '#/services/api'
import ListItem from '#/components/ListItem'

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  }

  static navigationOptions = {
    title: 'GitIssues',
  }

  state = {
    repositoryName: '',
    repositories: [],
    loading: false,
    error: '',
    refreshing: false,
  }

  async componentDidMount() {
    // await AsyncStorage.clear()
    const repositories = await AsyncStorage.getItem('@GitIssues:repositories')
    this.setState({ repositories: JSON.parse(repositories) || [] })
  }

  handleTextChange = text => {
    this.setState({ repositoryName: text })
  }

  addNewRepository = async () => {
    const { repositoryName } = this.state

    if (!repositoryName.length) return

    this.setState({ loading: true, error: false })

    const repository = await this.requestRepositoryData(repositoryName)

    if (!repository) {
      this.setState({
        error: 'Error trying to add the new repository',
        loading: false,
      })

      return
    }

    this.setState(state => ({
      repositories: [...state.repositories, repository],
      repositoryName: '',
      loading: false,
    }))

    this.updateRepositoriesStorage()
  }

  requestRepositoryData = async repositoryName => {
    try {
      const {
        data: { id, name, owner },
      } = await api.get(`/repos/${repositoryName}`)

      return {
        id,
        name,
        organization: owner.login,
        avatar: owner.avatar_url,
      }
    } catch (error) {
      return this.setState({
        error: 'Error trying to request the repository data',
      })
    }
  }

  // Update the AsyncStorage
  updateRepositoriesStorage = async () => {
    const { repositories } = this.state

    try {
      await AsyncStorage.setItem(
        '@GitIssues:repositories',
        JSON.stringify(repositories)
      )
    } catch (error) {
      this.setState({ error: 'Error saving the list of repositories' })
    }
  }

  renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => this.navigateToIssuesScreen(item)}>
      <ListItem
        header={item.name}
        subheader={item.organization}
        avatar={item.avatar}
      />
    </TouchableOpacity>
  )

  navigateToIssuesScreen = ({ name, organization }) => {
    const { navigation } = this.props

    navigation.navigate('Issues', { name, organization })
  }

  // Handle FlatList's onRefresh method
  handleRefresh = async () => {
    this.setState({ refreshing: true })

    const { repositories } = this.state

    const refreshedRepositories = await axios.all(
      repositories.map(({ organization, name }) =>
        this.requestRepositoryData(`${organization}/${name}`)
      )
    )

    this.setState({ refreshing: false, repositories: refreshedRepositories })
  }

  render() {
    const {
      repositoryName,
      repositories,
      loading,
      error,
      refreshing,
    } = this.state

    return (
      <View style={styles.container}>
        {!!error && <Text style={styles.errorMessage}>{error}</Text>}

        <View style={styles.formContainer}>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Organization/Repository"
            value={repositoryName}
            onChangeText={this.handleTextChange}
            style={styles.inputText}
            underlineColorAndroid="transparent"
          />

          <TouchableOpacity onPress={this.addNewRepository}>
            {loading ? (
              <ActivityIndicator size="small" />
            ) : (
              <Icon name="plus" size={25} style={styles.icon} />
            )}
          </TouchableOpacity>
        </View>

        <FlatList
          data={repositories}
          keyExtractor={item => String(item.id)}
          renderItem={this.renderItem}
          onRefresh={this.handleRefresh}
          refreshing={refreshing}
        />
      </View>
    )
  }
}
