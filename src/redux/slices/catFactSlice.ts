import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CatBreed, CatFact } from '../api/catFactApi';
import { RootState } from '../store';

interface State {
    breeds: CatBreed[];
    facts: CatFact[];
}

const initialState: State = { facts: [], breeds: [] };

export const catFactSlice = createSlice({
    name: 'cat',
    initialState: initialState,
    reducers: {
        setFacts: (state, action: PayloadAction<CatFact[]>) => {
            state.facts.push(...action.payload);
        },
        setBreeds: (state, action: PayloadAction<CatBreed[]>) => {
            state.breeds.push(...action.payload);
        },
    },
});

export const { setFacts, setBreeds } = catFactSlice.actions;

export const selectCatFacts = (state: RootState) => state.catFacts.facts;
export const selectCatBreeds = (state: RootState) => state.catFacts.breeds;
