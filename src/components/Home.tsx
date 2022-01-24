import React, {useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, ScrollView} from 'react-native';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {useCameraDevices, CameraDevice} from 'react-native-vision-camera';

export default function Home({navigation}: NativeStackHeaderProps) {
  const [device, setDevice] = useState<CameraDevice | null>(null);
  const devices = useCameraDevices();
  useEffect(() => {
    if (devices != null && devices.front) {
      setDevice(devices.front);
    }
  }, [devices]);
  return (
    <View>
      <Text style={style.text}>This is Home</Text>
      <Button
        title="Go to profile"
        onPress={() => {
          navigation.navigate('Profile', {name: 'Sam'});
        }}
      />
      <Button
        title="Camera View"
        onPress={() => {
          navigation.navigate('CameraView');
        }}
      />
      <ScrollView>
        <Text style={style.text}>{JSON.stringify(device, null, 6)}</Text>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  text: {
    color: '#000',
    marginTop: 90,
  },
});
