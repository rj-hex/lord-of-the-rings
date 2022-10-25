import React, { useMemo } from 'react';
import './Filter.css';
import searchIcon from '../../../assets/search.svg';
import { useDispatch } from 'react-redux';
import { gender, race, search, sort } from '../../../features/filterSlice';
import { Button, Col, Form, Input, Row, Select } from 'antd';

const { Option } = Select;

function Filter({ characterData = [] }) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const sortByName = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' }
    ];

    // const sortByGender = [...characterData.reduce((map, character) => map.set(character.gender, character.gender), new Map()).values()].flatMap(res => ({ value: res && res, label: res && res }));
    const sortByGender = [
        { value: 'Female', label: 'Female' },
        { value: 'Male', label: 'Male' }
    ];

    // const sortByRace = useMemo(() => [...characterData.reduce((map, character) => map.set(character.race, character.race), new Map()).values()].flatMap(res => ({ value: res, label: res })), [characterData]);
    const sortByRace = [
        { value: 'Hobbit', label: 'Hobbit' },
        { value: 'Human', label: 'Human' },
        { value: 'Elf', label: 'Elf' },
        { value: 'Maiar', label: 'Maiar' },
        { value: 'Dragon', label: 'Dragon' },
        { value: 'NaN', label: 'NaN' },
    ];

    const filterCharacterList = () => {
        dispatch(search(form.getFieldValue('search')));
        dispatch(sort(form.getFieldValue('sort')));
        dispatch(gender(form.getFieldValue('gender')));
        dispatch(race(form.getFieldValue('race')));
    };

    return (
        <Form form={form} className='filter' onFinish={filterCharacterList}>
            <Row className='filter__search-sort' align='middle'>
                <Col span={14}>
                    <Form.Item label="Search" name='search' className='filter__search'>
                        <Input addonAfter={<img src={searchIcon} alt="" />} />
                    </Form.Item>
                </Col>
                <Col span={9}>
                    <Form.Item className='filter__select-wrapper' name="sort" label="Sort by">
                        <Select placeholder="by name (asc/desc)">
                            {sortByName.map((sort, index) => (
                                <Option value={sort.value} key={index}>{sort.label}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>

            <Row className='filter__sort-gender-submit filter__search-sort'>
                <Col className='filter__sort-gender' span={8}>
                    <Form.Item className='filter__select-wrapper' name={'race'} label="Sort by">
                        <Select options={sortByRace} mode="multiple" placeholder="list of races, multiselect" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item name={'gender'} className='filter__select-wrapper' label="Gender">
                        <Select options={sortByGender} placeholder="Gender" />
                    </Form.Item>
                </Col>
                <Col span={4} className="filter__submit-wrapper">
                    <Form.Item>
                        <Button htmlType='submit' className='filter__submit' onSubmit={filterCharacterList}>Submit</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form >
    );
}

export default Filter;
