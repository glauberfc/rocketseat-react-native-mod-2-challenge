import { StyleSheet } from 'react-native'

import { colors, metrics } from '#/styles'

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: metrics.basePadding,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.ligther,
  },

  errorMessage: {
    marginBottom: metrics.baseMargin,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.danger,
  },

  formContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: metrics.baseMargin,
    paddingBottom: metrics.basePadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },

  inputText: {
    flex: 1,
    height: 44,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
    marginRight: metrics.baseMargin * 2,
    borderRadius: metrics.baseRadius,
  },

  icon: {},
})
