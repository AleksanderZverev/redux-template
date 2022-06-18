import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from './axiosBaseQuery';

export const tagTypes = {
    catFacts: 'CatFacts',
} as const;

export type TagType = typeof tagTypes[keyof typeof tagTypes];

export const api = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery,
    tagTypes: Array.from(Object.values(tagTypes)),
    endpoints: () => ({}),
});
