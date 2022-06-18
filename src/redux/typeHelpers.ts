import { TagType } from './api';
import { MutationDefinition, QueryDefinition } from '@reduxjs/toolkit/dist/query';
import { UseMutation, UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { CustomBaseQueryType } from '../redux/axiosBaseQuery';

export type GetInnerType<S> = S extends UseMutation<infer T> ? T : never;

export type GetMutationArgs<S> = S extends UseMutation<infer TDefinition>
    ? TDefinition extends MutationDefinition<infer TArg, CustomBaseQueryType, TagType, any>
        ? TArg
        : never
    : never;

export type GetMutationResult<S> = S extends UseMutation<infer TDefinition>
    ? TDefinition extends MutationDefinition<any, CustomBaseQueryType, TagType, infer TResult>
        ? TResult
        : never
    : never;

export type GetQueryArgs<S> = S extends UseQuery<infer TDefinition>
    ? TDefinition extends QueryDefinition<infer TArg, CustomBaseQueryType, TagType, any>
        ? TArg
        : never
    : never;

export type GetQueryResult<S> = S extends UseQuery<infer TDefinition>
    ? TDefinition extends QueryDefinition<any, CustomBaseQueryType, TagType, infer TResult>
        ? TResult
        : never
    : never;
