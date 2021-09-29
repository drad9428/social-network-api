const {User} = require('../models')

const userController = {
    getAllUsers(req, res){
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .then(dbData => res.json(dbData))
        .catch(err => {
            console.log(err)
            res.status(404).json(err)
        })
    },
    getUserById({params}, res){
        User.findOne({_id: params.id})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .populate({
            path: 'friends',
            select: '-__v'
        })
        .select('-__v')
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No user found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => {
             console.log(err)
             res.status(400).json(err)
        })
    },
    addFriend({params}, res){
        User.findByIdAndUpdate(
            {_id: params.id},
            {$push: {friends: params.friendId}},
            {new: true}
        )
        .then(dbData => {
            if (!dbData) {
                res.status(404).json({message: 'No friend found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    deleteFriend({params}, res){
        User.findOneAndUpdate(
            {_id: params.id},
            {$pull: {friends: params.friendId}},
            {new: true}
        )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err))
    },
    addUser({body}, res){
        User.create(body)
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err))
    },
    deleteUser({params}, res){
        User.findOneAndDelete({_id: params.id})
        .then(dbData => {
            if(!dbData){
                res.status(404).json({message: 'No user found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    updateUser({params, body}, res){
        User.findOneAndUpdate({_id: params.id}, body, {new: true})
        .then(dbData =>{
            if(!dbData){
                res.status(404).json({message: 'No user found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    }
}

module.exports = userController