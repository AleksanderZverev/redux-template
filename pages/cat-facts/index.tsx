import { Container, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import {
    withMutationResolver,
    WithMutationResolverProps,
    withOtherQueryResolver,
    withQueryResolver,
    WithQueryResolverData,
} from '../../src/hoc/withQueryResolver';
import { useAddCatFactMutation, useGetCatBreedsQuery, useGetCatFactsQuery } from '../../src/redux/api/catFactApi';
import { useRequiredTypedSelector } from '../../src/hooks/useRequiredSelector';
import { selectCatBreeds, selectCatFacts } from '../../src/redux/slices/catFactSlice';

type Resolvers = WithQueryResolverData<typeof useGetCatFactsQuery> &
    WithMutationResolverProps<typeof useAddCatFactMutation>;

interface CatFactsContentPageProps extends Resolvers {
    disableReload: () => void;
}

const CatFactsContentPage: FC<CatFactsContentPageProps> = ({
    disableReload,
    queryData: catFactsFromQuery,
    mutationProps: { mutate: requestAddingCatFact, showRetryModal, isLoading: isAddingCatFact },
}) => {
    const catFacts = useRequiredTypedSelector(selectCatFacts);
    const catBreeds = useRequiredTypedSelector(selectCatBreeds);
    const [fact, setFact] = useState('');

    const onAddCatFact = async () => {
        try {
            //We use data from slice so we don't need to reload data when tag invalidates
            disableReload();

            await requestAddingCatFact({ fact });
            setFact('');
        } catch {
            showRetryModal(onAddCatFact);
        }
    };

    return (
        <Container maxWidth="lg">
            <Typography variant="h2">Facts</Typography>
            <TextField
                placeholder="enter your fact"
                value={fact}
                onChange={(e) => setFact(e.target.value)}
                disabled={isAddingCatFact}
                onKeyDown={(e) => {
                    if (e.key !== 'Enter') {
                        return;
                    }

                    onAddCatFact();
                }}
            />
            <ul>
                {catFacts.map((c) => (
                    <li key={c.fact}>{c.fact}</li>
                ))}
            </ul>

            <Typography variant="h2">Breeds</Typography>
            <ul>
                {catBreeds.map((b) => (
                    <li key={b.breed}>
                        {b.breed} - {b.coat} - {b.country} - {b.origin} - {b.pattern}
                    </li>
                ))}
            </ul>
        </Container>
    );
};

// if some of query failed it tries to refetch the failed one only.
const WithCatFactsQuery = withQueryResolver(useGetCatFactsQuery)(CatFactsContentPage);
const WithBreeds = withOtherQueryResolver(useGetCatBreedsQuery)(WithCatFactsQuery);

const WithAddCatFactMutation = withMutationResolver(useAddCatFactMutation, 'Unable to add fact :(')(WithBreeds);

const CatFactsPage: FC = () => {
    const [skipLoading, setSkipLoading] = useState(false);
    //Query args are common to all methods
    return (
        <WithAddCatFactMutation
            disableReload={() => setSkipLoading(true)}
            queryArg={{ factsLimit: 10, breedsLimit: 10, someSameArg: 10 }}
            //disables loading for RTK Query hooks
            disableLoading={skipLoading}
        />
    );
};

export default CatFactsPage;
