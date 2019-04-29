import { StyleSheet } from 'react-native'
import { metrics, colors } from '#/styles'

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.white,
  },

  filter: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 8,
  },

  filterText: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.dark,
  },

  active: {
    fontWeight: 'bold',
  },
})
