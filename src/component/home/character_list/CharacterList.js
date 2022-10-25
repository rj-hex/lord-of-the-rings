import { Col, Modal, Row, Select, Table } from 'antd';
import React, { useState } from 'react';
import Header from '../header/Header';
import './CharacterList.css';

const { Option } = Select;

function CharacterList({ characterData = [], setLimit }) {
    const [open, setOpen] = useState(false);
    const [characterSpecific, setCharacterSpecific] = useState({});
    // const gender = useSelector((state) => state.filter);
    const popUpModal = (id) => {
        console.log(id);
        setOpen(true);
        setCharacterSpecific(() => characterData.find(character => character._id === id));
    };

    const characterDataList = characterData.flatMap((character, index) => ({ key: (index + 1).toString(), _id: character._id, serial_no: index + 1, name: character.name || "-", race: character.race || "-", gender: character.gender || "-" }));
    const colmuns = [
        {
            title: 'Id',
            dataIndex: "serial_no",
            key: 'serial_no'
        }, {
            title: 'Name',
            dataIndex: "name",
            key: 'name'
        }, {
            title: "Race",
            dataIndex: 'race',
            key: 'race'
        }, {
            title: "Gender",
            dataIndex: 'gender',
            key: 'gender'
        }, {
            title: "Action",
            dataIndex: 'gender',
            key: 'gender',
            render: (_, { _id }) => (
                <span onClick={() => popUpModal(_id)} style={{ cursor: 'pointer' }}>Details {">>"}</span>
            )
        }
    ];
    return (
        <>
            <Table className='character-list' columns={colmuns} dataSource={characterDataList} showSorterTooltip={false} pagination={{ pageSize: 10 }} />
            <Row className='characterList__selectWrapper'>
                <Col>
                    <Select defaultValue="10" onSelect={(selectedValue) => setLimit(selectedValue)} className="characterList__select" placeholder="Select limit" style={{ width: 120, marginRight: 'auto' }}>
                        <Option value="10">limit 10</Option>
                        <Option value="20">limit 20</Option>
                        <Option value="50">limit 50</Option>
                    </Select>
                </Col>
            </Row>

            <Modal open={open} className="character__modal" footer={null}>
                <Header name={characterSpecific.name} />
                <div className='popup-modal-container'>
                    <section className='popup-modal-detail'>
                        <div className='popup-modal-detail__character'>
                            <h3>Name</h3>
                            <h3>WikiUrl</h3>
                            <h3>Race</h3>
                            <h3>Gender</h3>
                            <h3>Height</h3>
                            <h3>Hair</h3>
                            <h3>Realm</h3>
                            <h3>Birth</h3>
                            <h3>Spouse</h3>
                            <h3>Death</h3>
                        </div>
                        <div className='popup-modal-detail__character'>
                            <h3>{characterSpecific.name || "-"}</h3>
                            <h3>{characterSpecific.wikiUrl || "-"}</h3>
                            <h3>{characterSpecific.race || "-"}</h3>
                            <h3>{characterSpecific.gender || "-"}</h3>
                            <h3>{characterSpecific.height || "-"}</h3>
                            <h3>{characterSpecific.hair || "-"}</h3>
                            <h3>{characterSpecific.realm || "-"}</h3>
                            <h3>{characterSpecific.birth || "-"}</h3>
                            <h3>{characterSpecific.spouse || "-"}</h3>
                            <h3>{characterSpecific.dethpouse || "-"}</h3>
                        </div>
                    </section>

                    <button onClick={() => setOpen(false)}>close</button>
                </div>
            </Modal>
        </>
    );
}

export default CharacterList;