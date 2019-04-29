import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

const FiltersTab = ({ filters, onPressFilter }) => (
  <View style={styles.container}>
    {filters.data &&
      filters.data.map(filter => (
        <TouchableOpacity
          key={filter.id}
          onPress={() => onPressFilter(filter.id)}
          style={styles.filter}
        >
          <Text
            style={[
              styles.filterText,
              filters.active === filter.id && styles.active,
            ]}
          >
            {filter.name}
          </Text>
        </TouchableOpacity>
      ))}
  </View>
)

FiltersTab.propTypes = {
  filters: PropTypes.shape({
    active: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onPressFilter: PropTypes.func.isRequired,
}

export default FiltersTab
