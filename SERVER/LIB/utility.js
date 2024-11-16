import bcrypt from 'bcrypt';

//hash password
async function hashPassword(plaintextPassword) {
    const hash = await bcrypt.hash(plaintextPassword, 10);
    console.log(hash);
    return hash;
}

//validate password
async function comparePassword(plaintextPassword, hash) {
    return await bcrypt.compare(plaintextPassword, hash);
}

export { hashPassword, comparePassword }