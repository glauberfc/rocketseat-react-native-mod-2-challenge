import Reactotron from 'reactotron-react-native' //eslint-disable-line

if (__DEV__) {
  Reactotron.configure()
    .useReactNative()
    .connect()

  Reactotron.clear()

  console.tron = Reactotron // eslint-disable-line
}
