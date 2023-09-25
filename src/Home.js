
import React, { useEffect, useState } from 'react';

import { Text ,TouchableOpacity,View} from 'react-native';
import { Icon } from 'react-native-elements';


const Home = (props) => {
  return (
    <>
     <TouchableOpacity onPress={()=>props.navigation.goBack()} style={{marginTop:'20%',flexDirection:'row',marginHorizontal:20}}>
            <Icon name='arrow-back' type='material'></Icon>
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
           
            height: '100%',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize:20,
            }}>
            Home
          </Text>
    </View>
    </>
  );
};
export default Home;