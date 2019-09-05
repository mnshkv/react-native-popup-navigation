/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native'

const { width, height } = Dimensions.get('window')

const App = (props) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', paddingTop: 100, backgroundColor: '#fff' }}>
      <TouchableOpacity onPress={() => { props.present('modal') }} style={{ padding: 20, backgroundColor: 'green' }}>
        <Text>hello</Text>
      </TouchableOpacity>
    </View>
  )
}

export default App
