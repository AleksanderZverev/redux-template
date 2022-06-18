import { api, tagTypes } from '../api';
import { setBreeds, setFacts } from '../slices/catFactSlice';

export interface CatFact {
    fact: string;
    length: number;
}

export interface CatBreed {
    breed: string;
    country: string;
    origin: string;
    coat: string;
    pattern: string;
}

export interface GetCatFactRequest {
    factLength?: number;
    factsLimit?: number;
    someSameArg: number;
}

export interface GetCatFactResponse {
    current_page: number;
    data: CatFact[];
    total: number;
}

export interface GetCatFactResponse {
    current_page: number;
    data: CatFact[];
    total: number;
}

export interface GetCatBreedRequest {
    breedsLimit: number;
    someSameArg: number;
}

export interface GetCatBreedResponse {
    current_page: number;
    data: CatBreed[];
    total: number;
}

export interface AddCatFactRequest {
    fact: string;
}

const baseUrl = 'https://catfact.ninja';

export const catFactApi = api.injectEndpoints({
    endpoints: (build) => ({
        getCatFacts: build.query<GetCatFactResponse, GetCatFactRequest>({
            query: (req) => ({
                url: baseUrl + '/facts',
                method: 'GET',
                params: { max_length: req.factLength, limit: req.factsLimit },
                onSuccess: async (dispatch, data) => {
                    const response = data as GetCatFactResponse;
                    dispatch(setFacts(response.data));
                },
            }),
            providesTags: [tagTypes.catFacts],
        }),
        getCatBreeds: build.query<GetCatBreedResponse, GetCatBreedRequest>({
            query: (req) => ({
                url: baseUrl + '/breeds',
                method: 'GET',
                params: { limit: req.breedsLimit },
                onSuccess: async (dispatch, data) => {
                    const response = data as GetCatBreedResponse;
                    dispatch(setBreeds(response.data));
                },
            }),
        }),
        addCatFact: build.mutation<CatFact, AddCatFactRequest>({
            queryFn: (arg, api) => {
                const randomVal = Math.random();

                if (randomVal < 0.45) {
                    return Promise.resolve({ error: 'some-error' });
                }

                const fact: CatFact = {
                    fact: arg.fact,
                    length: arg.fact.length,
                };

                return Promise.resolve({ data: fact });
            },
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const response = await queryFulfilled;
                    dispatch(setFacts([response.data]));
                } catch {}
            },

            //For example only. If you update data in onQueryStarted, so u don't need to invalidate tag
            invalidatesTags: [tagTypes.catFacts],
        }),
    }),
});

export const { useGetCatFactsQuery, useGetCatBreedsQuery, useAddCatFactMutation } = catFactApi;
