/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Dimensions } from 'react-native'

import Router from './lib/pages/router'

const App = () => {
  // let sheet = useRef(React.createRef())


  // const renderContent = () => {
  //   return (
  //     <View>
  //       <LoremIpsum />
  //       <LoremIpsum />
  //       <LoremIpsum />
  //     </View>
  //   )
  // }

  return (
    <Router />
  );
};

export default App;
