module.exports = middleware =>{
    return(req, res, next) =>{
        if(req.user.admin){
            middleware(req, res, next);
        }
        else if(!req.user){
             res.status(401).send({ msg: 'User not authenticated' });
        }
        else if (!req.user.admin){
            res.status(403).send({ msg: 'Admin privileges required' });
        }
        else{
            res.status(500).send({ msg: 'Unexpected error' });
        }
    }
}