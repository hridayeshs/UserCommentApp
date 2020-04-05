import axios from 'axios';
import bcrypt from 'bcryptjs';

export const UserRegistration = data => {
    const password = data.password;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    data["password"] = hash;

    return axios.post('http://localhost:5000/api/user', data)
        .then(res => res.status);
};

export const UsernameValidation = data => (
    axios.post('http://localhost:5000/api/validateUsername', data)
    .then(exist => exist.status)
)
