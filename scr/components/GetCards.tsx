import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  ListRenderItem,
} from 'react-native';
import usePokemons from '../domain/PokemonList';

interface Pokemon {
  name: string;
  image: string;
  peso: any;
}

export default function GetCards() {
  const {loading, pokemons} = usePokemons();
  const [search, setSearch] = useState<string>('');

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={'#ff0000'} />
        <Text style={styles.text}>Cargando...</Text>
      </View>
    );
  }

  const renderItem: ListRenderItem<Pokemon> = ({item}) => (
    <View style={styles.item}>
      <Image source={{uri: item.image || ' '}} style={styles.image} />
      <View>
        <Text style={styles.name}>{`Id: ${item.peso[0]}`}</Text>
        <Text style={styles.name}>{`Nombre: ${item.name}  `}</Text>
        <View style={styles.pokemonWeigth}>
          <Text style={styles.name}>{`Peso: ${item.peso[1]}  `}</Text>
          <Text style={styles.name}>{`Altura: ${item.peso[2]}  `}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Buscar Pokémon"
        value={search}
        onChangeText={text => setSearch(text)}
      />
      <FlatList
        data={filteredPokemons}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    width: '100%',
  },
  row: {
    justifyContent: 'space-between',
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 3,
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 3,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    textAlign: 'left',
    marginBottom: 10,
  },
  itemColumn: {
    display: 'none',
    flexDirection: 'column',
  },
  searchBar: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 20,
    width: '80%',
  },
  ActivityIndicatorStyles: {
    backgroundColor: '#ff0000',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  pokemonWeigth: {
    display: 'flex',
    flexDirection: 'row',
  },
});
