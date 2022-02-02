function createUserSessions(req, user, action) {
    req.session.uid = user._id.toString(); //_id format used by mongodb
    req.session.save(action); //when session successfully saved, execute action (function)
}

function destroyUserAuthSession(req){
    req.session.uid = null; 
    //we don't need to call req.session.save() because we don't have any actions here
}

module.exports = {
    createUserSessions: createUserSessions,
    destroyUserAuthSession: destroyUserAuthSession,
}