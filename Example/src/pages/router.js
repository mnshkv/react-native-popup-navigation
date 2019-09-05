import React from 'react'
import { Navigator } from '../../../lib/index'
import { Dimensions } from 'react-native'

import Home from './home'
import Modal from './pop_up'

const { height } = Dimensions.get('window')

export default () => {
  return (
    <Navigator pages={[ 
      { screen: Home, props: {}, name: 'home', init: true },
      { screen: Modal, props: {}, name: 'modal', snapPoints: [300, height] }
    ]} />
  )
}