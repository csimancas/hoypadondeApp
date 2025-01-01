import * as React from 'react';
import { Searchbar as PaperSearchBar } from 'react-native-paper';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <PaperSearchBar
      placeholder="Search"
    //   onChangeText={setSearchQuery}
    //   value={searchQuery}
    />
  );
};

export default SearchBar;
