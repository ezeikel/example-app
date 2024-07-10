import { StyleSheet, Dimensions } from 'react-native';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming, interpolate } from 'react-native-reanimated';
import { GestureDetector, Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from '@/components/Themed';

function clamp(val: number, min: number, max: number) {
  return Math.min(Math.max(val, min), max);
}

const { width, height } = Dimensions.get('screen')

export default function TabTwoScreen() {
 const progress = useSharedValue(0);
  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const prevTranslationX = useSharedValue(0);
  const prevTranslationY = useSharedValue(0);


  const pan = Gesture.Pan()
    .minDistance(1)
    .onStart(() => {
      prevTranslationX.value = translationX.value;
      prevTranslationY.value = translationY.value;
    })
    .onUpdate((event) => {
      const maxTranslateX = width / 2 - 50;
      const maxTranslateY = height / 2 - 50;

      translationX.value = clamp(
        prevTranslationX.value + event.translationX,
        -maxTranslateX,
        maxTranslateX
      );
      translationY.value = clamp(
        prevTranslationY.value + event.translationY,
        -maxTranslateY,
        maxTranslateY
      );
    })
    .runOnJS(true);


  const handlePress = () => {
    progress.value = withTiming(progress.value === 0 ? 1 : 0, { duration: 2000 });
  };

    const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ['blue', 'orange', 'blue']
    );

    const rotate = interpolate(progress.value, [0, 0.5, 1], [0, 90, 0]) + 'deg'
    const scale = interpolate(progress.value, [0, 0.5, 1], [1, 1.5, 1])

    return { backgroundColor, transform: [
    { translateX: translationX.value },
    { translateY: translationY.value},
    { rotate },
    { scale },
    ]};
  });

  return (
    <GestureHandlerRootView>
    <View style={styles.container}>
      <GestureDetector gesture={pan}>
      <Animated.View style={[{
        height: 100,
        width: 100,
        borderRadius: 20,
      }, animatedStyle]}
      onTouchStart={handlePress}
    />
    </GestureDetector>
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
