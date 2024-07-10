import { StyleSheet, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useContext } from 'react';
import { SelectecContext } from '../_layout';

export default function TabTwoScreen() {
    const { numbers, setNumbers } = useContext(SelectecContext);
    const { width} = useWindowDimensions();
  
  return (
    <View style={styles.container}>
      <FlatList data={numbers.filter(number =>  number.selected)} renderItem={({ item, index }) => (
        <TouchableOpacity onPress={() => {
          setNumbers(numbers.map((n, i) => {
            if (n.id === item.id) {
              return {
                ...n,
                selected: !n.selected
              }
            }
            return n
          })
        )
        }}>
        <View style={{
          width: width - 20,
          margin: 10,
          backgroundColor: item.selected ? "black": "blue",
          alignItems: 'center',
          padding: 40,
          borderRadius: 6,
          
        }}>
          <Text style={{
            color: 'white',
          }}>{item.value}</Text>
        </View>
          </TouchableOpacity>
      )} keyExtractor={item => item.id} />
    </View>
  )
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
