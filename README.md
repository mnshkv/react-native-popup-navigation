![](gifs/bottom_sheet.mov)  |  ![](gifs/navigation.mov) |
:---------------:|:----------------:|

# Installation

Open a Terminal in the project root and run:

```
yarn add react-native-popup-navigation
```

Install and link [react-native-gesture-handler](https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html)

# Usage

# Navigator

```js
import React from 'react'
import { Navigator } from 'react-native-popup-navigation'
import { Dimensions } from 'react-native'

import Home from './home'
import Popup from './pop_up'

const { height } = Dimensions.get('window')

export default () => {
  return (
    <Navigator pages={[ 
      { screen: Home, props: {}, name: 'home', init: true },
      { screen: Popup, props: {}, name: 'popup', snapPoints: [0, height] }
    ]} />
  )
}
```

# Props

| name                      | required | description |
| ------------------------- | -------- | ----------- |
| screen                    | yes      | React.Component |
| props                     | no       | your props |
| name                      | yes      | name to navigate |
| init                      | no       | inital page |
| snapPoints                | no       |             |
| popupStyle                | no       | form popup styles |

# Moving between screens

```js
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity, StyleSheet} from 'react-native'

const { width, height } = Dimensions.get('window')

const Home = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { props.present('popup') }} style={styles.btn}>
        <Text>Present</Text>
      </TouchableOpacity>
    </View>
  )
}

const PopUp = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { props.dismiss() }} style={styles.btn}>
        <Text>Present</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = {
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  btn: {
    padding: 20,
    backgroundColor: 'green'
  }
}

export default App
```