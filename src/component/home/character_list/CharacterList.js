import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useSelector } from 'react-redux';
import Header from '../header/Header';
import './CharacterList.css';

function CharacterList({ characterData = [] }) {
    console.log(characterData);
    const sortQuery = useSelector((state) => state.filter.sort) || "";
    const [open, setOpen] = useState(false);
    const [characterSpecific, setCharacterSpecific] = useState({});
    const popUpModal = (id) => {
        setOpen(true);
        setCharacterSpecific(() => characterData.find(character => character._id === id));
    };
    return (
        <>
            <table className='character-list'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Race</th>
                        <th>Gender</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {characterData?.map((character, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{character.name}</td>
                            <td>{character.race}</td>
                            <td>{character.gender}</td>
                            <td onClick={() => popUpModal(character._id)} className="character-list__details">Details {'>>'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <ReactModal isOpen={open} style={{ content: { padding: '0px' } }}>
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
            </ReactModal>
        </>
    );
}

export default CharacterList;


// const Popup = ({ id }) => {
//     return (
//     );
// };