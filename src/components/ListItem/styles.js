import { StyleSheet } from 'react-native'

import { metrics, colors } from '#/styles'

export default StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: metrics.baseMargin,
    paddingHorizontal: metrics.basePadding,
    paddingVertical: metrics.basePadding,
    borderRadius: metrics.baseRadius,
    backgroundColor: colors.white,
  },

  avatar: {
    width: 40,
    height: 40,
    marginRight: metrics.baseMargin,
    borderRadius: 20,
  },

  infoContainer: {
    flex: 1,
    flexWrap: 'wrap',
    marginRight: metrics.baseMargin * 2,
  },

  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darker,
  },

  subheader: {
    fontSize: 14,
    color: colors.regular,
  },

  icon: {
    color: colors.regular,
  },
})
