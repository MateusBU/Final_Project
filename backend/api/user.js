//app is the same from index.js

module.exports = app =>{
    const save = (req, res) =>{
        res.send('user save');
    }

    return {save};
}