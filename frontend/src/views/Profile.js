import React, {useContext} from 'react';
import axios from 'axios'

import {Button} from 'antd'

function Profile() {
    const accessToken = localStorage.getItem('accessToken')

    const config = {
        headers: {
        'Authorization': `JWT ${accessToken}`
        }
    }
    const changePassword = () => {
        axios.get('http://127.0.0.1:8000/auth/users/me/', config).then(response => {
            console.log(response)
        }).catch(error => console.log(error))
    }

    return (
        <div>
            <Button onClick = {changePassword}> change password </Button>
        </div>
    )
}

export default Profile