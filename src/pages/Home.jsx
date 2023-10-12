import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchForShows, searchForPeople } from './../api/tvmaze';
import SearchForm from '../components/SearchForm';
import ShowGrid from '../components/shows/ShowGrid';
import ActorsGrid from '../components/actors/ActorsGrid';
import { TextCenter } from '../components/common/TextCenter';

// const reducerFn = (currentCounter, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return currentCounter + 1;
//     case 'DECREMENT':
//       return currentCounter - 1;
//     case 'RESET':
//       return 0;
//     case 'SET_VALUE':
//       return action.newCounterValue;
//   }
//   return 0;
// };

const Home = () => {
  const [filter, setFilter] = useState(null);

  // const [counter, dispatch] = useReducer(reducerFn, 0);

  // const onIncrement = () => {
  //   dispatch({ type: 'INCREMENT' });
  // };
  // const onDecrement = () => {
  //   dispatch({ type: 'DECREMENT' });
  // };
  // const onReset = () => {
  //   dispatch({ type: 'RESET' });
  // };
  // const onSetToValue = () => {
  //   dispatch({ type: 'SET_VALUE', newCounterValue: 500 });
  // };

  const { data: apiData, error: apiDataError } = useQuery({
    queryKey: ['search', filter],
    queryFn: () =>
      filter.searchOption === 'shows'
        ? searchForShows(filter.q)
        : searchForPeople(filter.q),

    enabled: !!filter,
    refetchOnWindowFocus: false,
  });

  const onSearch = async ({ q, searchOption }) => {
    setFilter({ q, searchOption });
  };

  const renderApiData = () => {
    if (apiDataError) {
      return <TextCenter>Error occured: {apiDataError.message}</TextCenter>;
    }

    if (apiData?.length === 0) {
      return <TextCenter>No results</TextCenter>;
    }

    if (apiData) {
      return apiData[0].show ? (
        <ShowGrid shows={apiData} />
      ) : (
        <ActorsGrid actors={apiData} />
      );
    }

    return null;
  };

  return (
    <div>
      <SearchForm onSearch={onSearch} />

      {/* <div>Counter: {counter}</div>
      <button type="button" onClick={onIncrement}>
        Increment
      </button>
      <button type="button" onClick={onDecrement}>
        Decrement
      </button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
      <button type="button" onClick={onSetToValue}>
        Set to 500
      </button> */}

      <div>{renderApiData()}</div>
    </div>
  );
};

export default Home;
