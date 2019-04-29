import React from 'react'
import PropTypes from 'prop-types'
import { View, Image, Text } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './styles'

const ListItem = ({ avatar, header, subheader }) => (
  <View style={styles.container}>
    <Image style={styles.avatar} source={{ uri: avatar }} />

    <View style={styles.infoContainer}>
      <Text numberOfLines={1} style={styles.header}>
        {header}
      </Text>
      <Text style={styles.subheader}>{subheader}</Text>
    </View>

    <Icon name="angle-right" size={20} style={styles.icon} />
  </View>
)

ListItem.propTypes = {
  avatar: PropTypes.string.isRequired,
  header: PropTypes.string.isRequired,
  subheader: PropTypes.string.isRequired,
}

export default ListItem
