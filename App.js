import { Button, FlatList, StyleSheet, TextInput, View } from 'react-native';
import { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const handleFetch = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then(response => {
        if (!response.ok)
          throw new Error("Error in fetch: " + response.statusText);

        return response.json()
      })
      .then(data => setRepositories(data.items))
      .catch(err => console.error(err));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <TextInput
          value={keyword}
          onChangeText={text => setKeyword(text)}
        />
        <Button title="Find" onPress={handleFetch} />
        <FlatList
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
