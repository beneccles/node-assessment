let userData = require("./userData.json")

module.exports = {
    // GET /api/user Respond with entire usersarray, with stat 200
    //  Possible Queries
    //  - "age" Return all users who have an age less than this age
    // - "email" Return all users whose email matches.
    // - "favorites" Return all users who have this favorite in their array of favorites.
    users(req, res) {
        const {age, email, favorites} = req.query
        let filteredArr = [];

        if (age) {
            filteredArr = userData.filter((element) => {
                if (element.age < age) {
                    return true
                } else {
                    return false
                }
            })

            res.status(200).send(filteredArr)
        }

        if (email) {
            filteredArr = userData.filter((element) => {
                if (element.email === email) {
                    return true
                } else {
                    return false
                }
            })

            res.status(200).send(filteredArr)
        }

        if (favorites) {
            filteredArr = userData.filter((element) => {
                for (let i = 0; i < element.favorites.length; i++) {
                    if (element.favorites[i] === favorites) {
                        return true;
                    } else {
                        return false;
                    }
                }
            })

            res.status(200).send(filteredArr)
        }

        res.status(200).send(userData)

    },
    // GET /api/user/ + userId
    // userId as a param string, if user found respond with status 200 and send that user's object/
    // Otherwise, 404
   user(req, res) {
        const {userId} = req.params;
        // I could take advantage of the fact the ids are in array order,
        // but in this case I choose to pretend that it wasn't.
        // This could be solved as returning userData[parseInt(userId)] since they are in order.
        const filteredArr = userData.filter((element) => {
            if (element.id === parseInt(userId)) {
                return true
            } else {
                return false
            }
        })

        if (filteredArr.length > 0) {
            res.status(200).send(filteredArr)
        } else {
            res.sendStatus(404)
        }
    },
    // GET /api/admin
    // Respond 200, with array of all users who are admins
    admin(req, res) {
        filteredArr = userData.filter((element) => {
            if (element.type === "admin") {
                return true
            } else {
                return false
            }
        })

        res.status(200).send(filteredArr)
    },
    // GET /api/nonadmin
    // Respond 200, with array of all non-admin users.
    async nonAdmin(req, res) {
        filteredArr = userData.filter((element) => {
            if (element.type !== "admin") {
                return true
            } else {
                return false
            }
        })

        res.status(200).send(filteredArr)
    },
    // GET /api/type/ + userType
    async userType(req, res) {
        const {userType} = req.params;
        filteredArr = userData.filter((element) => {
            if (element.type === userType) {
                return true
            } else {
                return false
            }
        })

        res.status(200).send(filteredArr)

    },
    // PUT /api/user/ + userId
    // Recieve a users info in request body. Update user with matching ID
    async userUpdate(req, res) {

    },
    // POST /api/user
    // Users info in request body to be added to userData array.
    // Add ID before pushing it to userData
    async newUser(req, res) {

    },
    // DELETE /api/user/ + userId
    // Remove user based on passed in userID param
    // Return status 200 and the array of user objects after the correct user object has been removed.
    async deleteUser(req, res) {

    }

}