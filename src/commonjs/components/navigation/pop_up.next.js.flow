import React, { Component } from 'react'
import { Animated, StyleSheet, View, Dimensions, Easing } from 'react-native'
import {
  PanGestureHandler,
  NativeViewGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('window')

const EPSILON = 1e-9

const easeIn = Easing.bezier(0.42, 0, 1, 1, EPSILON)
const easeOut = Easing.bezier(0, 0, 0.58, 1, EPSILON)
const easeInOut = Easing.bezier(0.42, 0, 0.58, 1, EPSILON)
const def = Easing.bezier(0.25, 0.1, 0.25, 1, EPSILON)

export default class PopUp extends Component {
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
      lastSnap: END,
      bounces: props.bounces
    }

    this._lastScrollYValue = props._lastScrollYValue
    this._lastScrollY = props._lastScrollY

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

    this._dragY = props._dragY

    this._onGestureEvent = Animated.event(
      [{ nativeEvent: { translationY: this._dragY } }],
      { useNativeDriver: props.nativeDriver }
    )

    this._reverseLastScrollY = Animated.multiply(
      new Animated.Value(-1),
      this._lastScrollY
    )

    this._translateYOffset = props._translateYOffset

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
      inputRange: [START, AFTER_START / 12],
      outputRange: [0, props.cornerRadius],
      extrapolate: 'clamp',
    })
  }

  componentDidMount() {
    // this.snapTo(this.props.snapPoints[0])
  }

  _onHeaderHandlerStateChange = ({ nativeEvent }) => {
    if (nativeEvent.oldState === State.BEGAN) {
      this._lastScrollY.setValue(0)
    }

    this._onHandlerStateChange({ nativeEvent })
  }

  snapTo = (value) => {
    Animated.timing(this._translateYOffset, {
      // velocity: 0,
      // overshootClamping: true,
      // tension: 68,
      // friction: 12,
      duration: 250,
      toValue: value,
      easing: def,
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
        if (this.state.lastSnap === this.props.snapPoints[this.props.snapPoints.length - 1]) {
          this.props.dismiss()
        }
      })
    }
  }

  render() {
    return (
      <TapGestureHandler
        maxDurationMs={100000}
        ref={this.masterdrawer}
        maxDeltaY={this.state.lastSnap - this.props.snapPoints[0]}>
        <View style={{ position: 'absolute', width, height, top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="box-none">
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
                    borderTopLeftRadius: this.props.cornerRadius,
                    borderTopRightRadius: this.props.cornerRadius
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
                    contentContainerStyle={{ minWidth: width, minHeight: height }}
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

PopUp.defaultProps = {
  bounces: true,
  nativeDriver: true,
  animateBorder: false,
  cornerRadius: 20
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'red',
  },
})