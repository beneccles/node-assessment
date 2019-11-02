let userData = require("./userData.json")

module.exports = {
    // GET /api/user Respond with entire usersarray, with stat 200
    //  Possible Queries
    //  - "age" Return all users who have an age less than this age
    // - "email" Return all users whose email matches.
    // - "favorites" Return all users who have this favorite in their array of favorites.
    users(req, res) {
        const {age, email, favorites} = req.query
        let filteredArr = userData

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
                const favs = element.favorites;

                for (let i = 0; i < favs.length; i++) {
                    if (favs[i] === favorites) {
                        return true;
                    }
                }
            })
            res.status(200).send(filteredArr)
        }

        if (!age || !email || !favorites) {
            res.status(200).send(filteredArr)
        }

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
            res.status(200).send(filteredArr[0])
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
        const {userId} = req.params;
        const update = {id: parseInt(userId), ...req.body};
        const updatedArray = userData;
        updatedArray.splice(parseInt(userId) - 1, 1, update)

        res.status(200).send(updatedArray)

    },
    // POST /api/user
    // Users info in request body to be added to userData array.
    // Add ID before pushing it to userData
    async newUser(req, res) {
        let newUser = {id: userData.length + 1, ...req.body}
        const newArr = userData;
        newArr.push(newUser)
        res.status(200).send(newArr)
    },
    // DELETE /api/user/ + userId
    // Remove user based on passed in userID param
    // Return status 200 and the array of user objects after the correct user object has been removed.
    async deleteUser(req, res) {
        const { userId } = req.params;
        let updateData = userData
        console.log(updateData.length)
        const filteredArr = userData.filter((element) => {
            if (element.id === parseInt(userId)) {
                for (let i = 0; i > userData.length; i++) {
                    if (userData[i].id === element.id) {
                        userData.splice(i, 1, "")
                    }
                }
                return false
            } else {
                return true
            }
        })


        if (filteredArr.length === 0) {
            res.sendStatus(404)
        } else {
            res.status(200).send(filteredArr)
        }
  
    }

}