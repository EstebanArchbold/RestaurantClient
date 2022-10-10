import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Plates from '../ui/Plates';

const Menu = () => {
    // define plates state initialazing empty
    const [ plates, savePlates] = useState([]);

    const {firebase} = useContext(FirebaseContext);

    // consult database before charging
    useEffect(() => {
        const getPlates = () => {
            firebase.db.collection('products').onSnapshot(handleSnapshot);
        }
        getPlates();
    });

    // Snapshot allows to use real time database in firestore

    function handleSnapshot(snapshot) {
        const plates = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        // save results on state
        savePlates(plates);
    }

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4">Menu</h1>
                <Link to="/new-dish" className="ml-3 
                bg-blue-900 
                hover:bg-blue-700 
                inline-block mb-5 p2 
                text-white uppercase  font-bold">
                    Agregar platillo
                </Link>

                {plates.map( plates => (
                    <Plates
                        key={plates.id}
                        plates={plates}
                    />
                ) )}
        </>
    );
}

export default Menu;