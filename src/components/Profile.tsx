import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';

import {View, Text} from 'react-native';

type ProfileRootParamList = {
  Profile: {name: string};
};

type ProfileProps = NativeStackScreenProps<ProfileRootParamList, 'Profile'>;

export default function Profile({route}: ProfileProps) {
  return (
    <View>
      <Text>Profile:</Text>
      <Text>This is {route.params.name}'s profile</Text>
    </View>
  );
}
