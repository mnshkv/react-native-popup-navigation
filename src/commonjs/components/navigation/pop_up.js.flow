import React, { Component, useRef } from 'react'
import { Animated, StyleSheet, View, Dimensions } from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

export class BottomSheet extends Component {
  masterdrawer = React.createRef()
  drawer = React.createRef()
  drawerheader = React.createRef()
  scroll = React.createRef()
  scrollV = React.createRef()

  constructor(props) {
    super(props)
    const START = props.snapPoints[0]
    const AFTER_START = props.snapPoints[1]
    const END = props.snapPoints[props.snapPoints.length - 1]

    this.state = {
      lastSnap: START,
      bounces: props.bounces
    }

    this._lastScrollYValue = 0
    this._lastScrollY = new Animated.Value(0)
    this._onRegisterLastScroll = Animated.event(
      [{ nativeEvent: { contentOffset: { y: this._lastScrollY } } }],
      { useNativeDriver: props.nativeDriver }
    )

    this._lastScrollY.addListener(({ value }) => {
      this._lastScrollYValue = value
      if (value <= 20) {
        this.setState({ bounces: false })
      } else {  
        this.setState({ bounces: true })
      }
    })

    this._dragY = new Animated.Value(0)

    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: props.nativeDriver }
    )

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    )

    this._translateYOffset = new Animated.Value(END)

    this._translateY = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, END],
      outputRange: [START, END],
      extrapolate: 'clamp',
    })

    this._radius = Animated.add(
      this._translateYOffset,
      Animated.add(this._dragY, this._reverseLastScrollY)
    ).interpolate({
      inputRange: [START, AFTER_START / 2],
      outputRange: [0, props.corderRadius],
      extrapolate: 'clamp',
    })
  }
  _onHeaderHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }

    this._onHandlerStateChange({ nativeEvent })
  }

  componentDidMount() {
    this.snapTo(this.props.snapPoints[0])
  }

  snapTo = (value) => {
    Animated.spring(this._translateYOffset, {
      tension: 68,
      friction: 12,
      toValue: value,
      useNativeDriver: this.props.nativeDriver,
    }).start(() => {
      this.setState({ lastSnap: value })
    })
  }

  _onHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.ACTIVE) {
      let { velocityY, translationY } = nativeEvent
      translationY -= this._lastScrollYValue
      const dragToss = 0.05
      const endOffsetY = this.state.lastSnap + translationY + dragToss * velocityY

      let destSnapPoint = this.props.snapPoints[0]

      for (let i = 0; i < this.props.snapPoints.length; i++) {
        const snapPoint = this.props.snapPoints[i]
        const distFromSnap = Math.abs(snapPoint - endOffsetY)
        if (distFromSnap < Math.abs(destSnapPoint - endOffsetY)) {
          destSnapPoint = snapPoint
        }
      }

      this.setState({ lastSnap: destSnapPoint })
      this._translateYOffset.extractOffset()
      this._translateYOffset.setValue(translationY)
      this._translateYOffset.flattenOffset()
      this._dragY.setValue(0)

      Animated.spring(this._translateYOffset, {
        velocity: velocityY,
        tension: 68,
        friction: 12,
        toValue: destSnapPoint,
        useNativeDriver: this.props.nativeDriver,
      }).start(() => {
      })

      setTimeout(() => {
        if (destSnapPoint >= this.props.snapPoints[this.props.snapPoints.length - 1] - 50) {
          this.props.dismiss()
        }
      }, 150)
    }
  }

  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - this.props.snapPoints[0]}>
        <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
          <Animated.View
            style={
              {
                width,
                height,
                transform: [{ translateY: this._translateY }],
              }
            }>
            <PanGestureHandler
              ref={this.drawer}
              simultaneousHandlers={[this.scroll, this.masterdrawer]}
              shouldCancelWhenOutside={false}
              onGestureEvent={this._onGestureEvent}
              onHandlerStateChange={this._onHandlerStateChange}>
              <Animated.View 
                style={[
                  styles.container,
                  this.props.animateBorder && {
                    overflow: 'hidden',
                    borderTopLeftRadius: this._radius,
                    borderTopRightRadius: this._radius
                  },
                  !this.props.animateBorder && {
                    overflow: 'hidden',
                    borderTopLeftRadius: this.props.corderRadius,
                    borderTopRightRadius: this.props.corderRadius
                  }
                ]}
              >
                <NativeViewGestureHandler
                  ref={this.scroll}
                  waitFor={this.masterdrawer}
                  simultaneousHandlers={this.drawer}>
                  <Animated.ScrollView
                    ref={ref => { this.scrollV = ref}}
                    style={this.props.scrollStyle}
                    bounces={this.state.bounces}
                    onScrollBeginDrag={this._onRegisterLastScroll}
                    scrollEventThrottle={16}>
                      {this.props.renderContent()}
                  </Animated.ScrollView>
                </NativeViewGestureHandler>
              </Animated.View>
            </PanGestureHandler>
          </Animated.View>
        </View>
      </TapGestureHandler>
    )
  }
}

BottomSheet.defaultProps = {
  bounces: true,
  nativeDriver: true,
  animateBorder: false,
  corderRadius: 20
}

export default class BottomSheetContainer extends Component {
  bottomSheet = React.createRef()

  snapTo = (value) => {
    this.bottomSheet.snapTo(value)
  }

  render() {
    return (
      <View style={[styles.container, { position: 'absolute', top: 0, left: 0 }]}>
        <BottomSheet ref={ref => { this.bottomSheet = ref }} {...this.props} />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})