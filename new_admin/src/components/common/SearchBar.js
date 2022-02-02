import React, { memo, useEffect } from 'react';
import { Paper, InputBase, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchBar = memo(({ value, onChange, onSubmit }) => {
  return (
    <Paper
      onSubmit={onSubmit}
      component="form"
      sx={{
        mb: 2,
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        defaultValue={value}
        name="searchText"
        onChange={onChange}
        placeholder="이름을 입력해주세요"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
        <Search />
      </IconButton>
    </Paper>
  );
});

export default SearchBar;
