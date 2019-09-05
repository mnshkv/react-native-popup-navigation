/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'
import { LoremIpsum } from './common'
const { width, height } = Dimensions.get('window')

const App = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <LoremIpsum />
      <LoremIpsum />
      <LoremIpsum />
    </View>
  )
}

export default App
