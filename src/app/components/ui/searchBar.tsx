'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface SearchBarProps {
    onCategoryChange: (category: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCategoryChange }) => {
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState('');


    useEffect(() => {
        //Função extrair as categorias da API
        const fetchCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/categories');
                if (!response.ok) {
                    throw new Error('Falha ao carregar categorias da API');
                }
                const data: string[] = await response.json();
                setCategories(['All Products', ...data]);
            } catch (error) {
                console.error('Erro ao carregar categorias', error)
            }
        };
        fetchCategories();
    }, [])


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedCategory(event.target.value as string);
        onCategoryChange(event.target.value as string); // Passando a categoria selecionada para o componente pai
    };


    return (
        <div className="flex flex-wrap justify-between mt-4  max-w-[1280px] m-auto">
            <div>
                {/*Filter*/}
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="category-select"
                            value={selectedCategory}
                            label="Categoria"
                            onChange={handleChange}
                        >
                            {
                                categories.map(category => (
                                    <MenuItem key={category} value={category}>{category}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <div>
                {/*Search*/}
                <Box
                    sx={{
                        width: 500,
                        maxWidth: '100%',
                    }}
                >
                    <TextField fullWidth label="Busca" id="fullWidth" />
                </Box>
            </div>
        </div>
    )
}

export default SearchBar