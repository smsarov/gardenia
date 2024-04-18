import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import Animated from 'react-native-reanimated'

const Blur = React.forwardRef((props, ref) => {
    return (<BlurView ref = {ref} {...props}/>)
})



const AnimatedBlur = Animated.createAnimatedComponent(Blur)

export default AnimatedBlur

const styles = StyleSheet.create({})