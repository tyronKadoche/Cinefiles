import React, {useEffect} from 'react';
import axios from 'axios';

export default function Profil() {

    const token = localStorage.getItem('token');

    function getUserData() {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        axios.get(`http://localhost:5000/cinefiles-12/europe-west1/api/user`, config)
            .then(function (res) {
                console.log('res = ', res)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getUserData();
    })

    return (
        <h1>PROFIL</h1>
    )
}