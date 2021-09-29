const {Thought, User} = require('../models')

const thoughtController = {
    getAllThoughts(req, res){
        Thought.find({})
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err))
    },
    getThoughtById({params}, res){
        Thought.findOne({_id: params.thoughtId})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbData =>{
            if(!dbData){
                res.status(404).json({message: 'No thought found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    addThought({params, body}, res){
        Thought.create(body)
        .then(({_id}) => {
            return User.findOneAndUpdate(
                {username: body.username},
                {$push: {thoughts: _id}},
                {new: true}
            )
        })
        .then(dbData => {
            if(!dbData){
                res.status(404).json({message: 'No user found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    updateThought({params, body}, res){
        Thought.findOneAndUpdate({_id: params.thoughtId}, body, {new: true})
        .then(dbData => {
            if(!dbData){
                res.status(404).json({message: 'No thought found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    removeThought({params}, res){
        Thought.findOneAndDelete({_id: params.thoughtId})
        .then(dbData => {
            if(!dbData){
                res.status(404).json({message: 'No thought found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    addReaction({params, body}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$push: {reactions: body}},
            {new: true}
        )
        .then(dbData => {
            if (!dbData){
                res.status(404).json({message: 'No thought found by id'})
                return
            }
            res.json(dbData)
        })
        .catch(err => res.json(err))
    },
    removeReaction({params}, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId},
            {$pull: {reactions: {reactionId: params.reactionId}}},
            {new: true}
        )
        .then(dbData => res.json(dbData))
        .catch(err => res.json(err))
    }
}

module.exports = thoughtController