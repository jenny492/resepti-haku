// ListSeparator https://github.com/KasperKloster/ComponentsExplained

import { useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json()
      })
      .then(data => setMeals(data.meals))
      .catch(err => console.error(err));
  }

  const listSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.input}>
          <TextInput
            style={styles.textInput}
            placeholder='Keyword'
            value={keyword}
            onChangeText={text => setKeyword(text)}
          />
          <View style={styles.button}>
            <Button title="Find" onPress={handleFetch} />
          </View>
        </View>

        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={meals}
          keyExtractor={(meal) => meal.idMeal}
          ItemSeparatorComponent={listSeparator}
          renderItem={({ item }) =>
            <View style={styles.listItem}>
              <Text>{item.strMeal}</Text>
              <Image
                style={styles.image}
                src={item.strMealThumb}
              />
            </View>
          }
        />

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: 66,
    height: 58,
  },
  input: {
    width: '70%',
    marginBottom: 20,
    alignItems: 'center',
    gap: 10,
  },
  button: {
    width: 200,
  },
  list: {
    paddingHorizontal: 20,
    flex: 1,
    alignSelf: 'stretch',
  },
  listContent: {
    paddingBottom: 60,
  },
  listItem: {
    margin: 20,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#140f0f',
  },
});
