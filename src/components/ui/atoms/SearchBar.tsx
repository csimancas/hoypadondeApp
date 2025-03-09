import React, { useState } from 'react';
import { Searchbar as PaperSearchBar } from 'react-native-paper';



interface SearchBarProps {
  onSearch: (query: string) => void;
}
const SearchBarComponent: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query); // Pasamos el valor al padre
  };

  return (
    <PaperSearchBar
      placeholder="Buscar negocio..."
      onChangeText={handleSearch}
      value={searchQuery}
    />
  );
};

export default SearchBarComponent;
