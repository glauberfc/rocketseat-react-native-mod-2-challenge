import { StyleSheet } from 'react-native'

import metrics from './metrics'
import colors from './colors'

export default StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: metrics.basePadding,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.ligther,
  },

  centralizerContainer: {
    paddingTop: 300,
    alignItems: 'center',
  },
})
