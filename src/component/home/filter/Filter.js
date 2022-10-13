import React, { useRef } from 'react';
import './Filter.css';
import searchIcon from '../../../assets/search.svg';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { search, sort } from '../../../features/filterSlice';

function Filter({ filtering, characterData = [] }) {
    const inputRef = useRef();
    const sortRef = useRef();
    const raceRef = useRef();
    const genderRef = useRef();
    const dispatch = useDispatch();

    const sortByName = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' }
    ];

    const sortByGender = [...characterData.reduce((map, character) => map.set(character.gender, character.gender), new Map()).values()].flatMap(res => ({ value: res.toLowerCase(), label: res }));

    const sortByRace = [...characterData.reduce((map, character) => map.set(character.race, character.race), new Map()).values()].flatMap(res => ({ value: res.toLowerCase(), label: res }));

    console.log(sortByRace.flatMap(res => ({ value: res, label: res })));

    const filterCharacterList = (event) => {
        event.preventDefault();
        filtering(sortRef.current.props.value?.value || "");
        dispatch(search(inputRef.current.value));
        dispatch(sort(sortRef.current.props.value?.value || ""));
    };

    return (
        <form className='filter' onSubmit={(e) => filterCharacterList(e)}>
            <section className='filter__search-sort'>
                <div className='filter__search'>
                    <label>Search</label>
                    <div className='filter__search-input-wrapper'>
                        <input type={'text'} placeholder="by name" ref={inputRef} />
                        <img src={searchIcon} alt="" />
                    </div>
                </div>
                <div className='filter__select-wrapper'>
                    <label>Sort by</label>
                    <Select options={sortByName} ref={sortRef} onChange={() => dispatch(search(inputRef.current.value))} name="sort" placeholder="by name (asc/desc)" classNamePrefix={'filter__select-order'} />
                </div>
            </section>

            <section className='filter__sort-gender-submit filter__search-sort'>
                <div className='filter__sort-gender'>
                    <div className='filter__select-wrapper'>
                        <label>Sort by</label>
                        <Select options={sortByRace} ref={raceRef} isMulti placeholder="list of races, multiselect" classNamePrefix={'filter__select-order'} />
                    </div>
                    <div className='filter__select-wrapper'>
                        <label>Gender</label>
                        <Select options={sortByGender} ref={genderRef} placeholder="Gender" classNamePrefix={'filter__select-order'} />
                    </div>
                </div>
                <button type='submit' className='filter__submit'>Submit</button>
            </section>
        </form>
    );
}

export default Filter;
