
import React, { useEffect, useState } from 'react';

import { Text ,TouchableOpacity,View} from 'react-native';
import { Icon } from 'react-native-elements';
import { useTheme } from '@react-navigation/native';


const Home = (props) => {
  const { colors } = useTheme();
  return (
    <>
     <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginTop:'20%',flexDirection:'row',marginHorizontal:20}}>
            <Icon color={colors.text} name='arrow-back' type='material'></Icon>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
           
            height: '100%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.text,
              fontSize:20,
            }}>
            Home
          </Text>
    </View>
    </>
  );
};
export default Home;