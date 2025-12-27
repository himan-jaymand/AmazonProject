// server/utils/generateToken.js

import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // توکن بعد از 30 روز منقضی می‌شود
    });
};

export default generateToken;