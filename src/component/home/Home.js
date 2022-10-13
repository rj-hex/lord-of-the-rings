import React, { useCallback, useEffect, useMemo, useState } from 'react';
import CharacterList from './character_list/CharacterList';
import Filter from './filter/Filter';
import Header from './header/Header';
import Axios from '../../axios';
import { useSelector } from 'react-redux';
import Fuse from 'fuse.js';

function Home() {
    const [characterData, setCharacterData] = useState([]);
    const query = useSelector((state) => state.filter) || {};
    // const sortQuery = useSelector((state) => state.filter.sort) || "";
    useEffect(() => {
        characterResponse();
    }, []);

    const characterResponse = async () => {
        await Axios.get('/character?limit=10').then(({ data }) => setCharacterData(data.docs));
    };
    const filtering = (sort) => {
        for (const [key, _] of Object.entries(query)) {
            if (key.includes('search')) {
                const fuse = new Fuse(characterData, { keys: ['name'], minMatchCharLength: query.search.length });
                const filter = fuse.search(query).map((value) => { return value.item; });
                setCharacterData(() => filter);
            } else if (key.includes('sort')) {
                sort === 'asc' ? characterData.sort((a, b) => a.name.localeCompare(b.name)) : characterData.reverse();
            } else {
                characterResponse();
            }
        }
    };
    return (
        <div>
            <Header />
            <Filter filtering={filtering} characterData={characterData} />
            <CharacterList characterData={characterData} />
        </div>
    );
};

export default Home;
