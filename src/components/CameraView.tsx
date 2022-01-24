import React, {useEffect} from 'react';
import {StyleSheet, Text, TextInput} from 'react-native';

import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {labelImage} from 'vision-camera-image-labeler';
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from 'react-native-reanimated';

const AnimatedText = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({text: true});

export default function CameraView() {
  const currentLabel = useSharedValue('');
  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermission();
      await Camera.requestMicrophonePermission();
    })();
  }, []);

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const labels = labelImage(frame);
    if (labels[0]?.confidence > 0.8) {
      currentLabel.value = labels[1]?.label;
    }
  }, []);

  const textProps = useAnimatedProps(
    () => ({text: currentLabel.value}),
    [currentLabel.value],
  );

  const devices = useCameraDevices();
  const device = devices.back;

  if (device == null) {
    return <Text>Loading...</Text>;
  }
  return (
    <>
      <Camera
        style={style.camera}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={3}
      />

      <AnimatedText
        style={style.text}
        //@ts-expect-error native `text` prop isn't expected in `TextInputProps`
        animatedProps={textProps}
      />
    </>
  );
}

const style = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
  },
  text: {
    position: 'absolute',
    backgroundColor: '#000',
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
    left: 0,
    right: 0,
    padding: 8,
  },
});
