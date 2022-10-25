import React, { useEffect, useState } from 'react';
import CharacterList from './character_list/CharacterList';
import Filter from './filter/Filter';
import Header from './header/Header';
import Axios from '../../axios';
import { useSelector } from 'react-redux';

function Home() {
    const [characterData, setCharacterData] = useState([]);
    const query = useSelector((state) => state.filter) || {};
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        characterResponse();
    }, [query, limit]);

    const characterResponse = async () => {
        await Axios.get(`/character?limit=${limit}&sort=name:${query.sort ? query.sort : 'asc'}&gender=${query.gender ? query.gender : encodeURIComponent('')}&name=${query.search ? query.search : encodeURIComponent('')}&race=${query.race ? query.race.toString() : encodeURIComponent('')}`)
            .then(({ data }) => {
                setCharacterData(data.docs);
            });
    };

    return (
        <div>
            <Header />
            <Filter characterData={characterData} />
            <CharacterList characterData={characterData} setLimit={setLimit} />
        </div>
    );
};

export default Home;
