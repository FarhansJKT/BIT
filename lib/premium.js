const fs = require('fs')
const toMs = require('ms')

/**
 * Add premium user.
 * @param {String} userId 
 * @param {String} expired 
 * @param {Object} _dir 
 */
const addUser = (userId, pushname, _dir) => {

    const obj = {
        UID : userId,
        Username : pushname,
        OFC : false,
        data : {
                Point : 10,
                Limit : 10
        },
        Recent : {
                Command : [],
                Message : []
        },
        Oshimen : {
        }
}
    _dir.push(obj)
    fs.writeFileSync('./database/premium.json', JSON.stringify(_dir, null, 2))
}

/**
 * Get premium user position.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */


const cekUser = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position]
    }
}

const cekPoint = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            position = i
        }
    })
    if (position !== null) {return _dir[position].data.Point}
}

const addPoint = (userId, point, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            position = i
        }
    })
    if (position !== null) {
	_dir[position].data.Point += point
	fs.writeFileSync('./database/premium.json', JSON.stringify(_dir, null, 2))
    }
}

const addOshi = (userId, jsonOshi, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            position = i
        }
    })
    if (position !== null) {
       _dir[position].Oshimen = jsonOshi
       fs.writeFileSync('./database/premium.json', JSON.stringify(_dir, null, 2))
    }
}

const getOshimen = (userId, _dir) => {
    let position = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            position = i
        }
    })
    if (position !== null) {
        return _dir[position].Oshimen
    }
}

/**
 * Check user is premium.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const buySistem = (userId, curent, _dir) => {
    let status = null
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            status = i
        }
    })
    if (status !== null) {
         if (_dir[status].data.Point >= curent) {
             _dir[status].data.Point -= curent
             fs.writeFileSync('./database/premium.json', JSON.stringify(_dir, null, 2))
             return { status: 200 }
         } else {
             return false
         }
    }
}

const buyGachaSistem = (userId, _dir) => {
    let status = null
    let curent = 1
    Object.keys(_dir).forEach((i) => {
        if (_dir[i].UID === userId) {
            status = i
        }
    })
    if (status !== null) {
         if (_dir[status].data.Limit >= curent) {
             _dir[status].data.Limit -= curent
             fs.writeFileSync('./database/premium.json', JSON.stringify(_dir, null, 2))
             return { status: 200 }
         } else {
             return false
         }
    }
}

/**
 * Constantly checking premium.
 * @param {Object} _dir 
 */

/**
 * Get all premium user ID.
 * @param {Object} _dir 
 * @returns {String[]}
 */
const getAllPremiumUser = (_dir) => {
    const array = []
    Object.keys(_dir).forEach((i) => {
        array.push(_dir[i].id)
    })
    return array
}

module.exports = { addUser, cekUser, cekPoint, addPoint, addOshi, getOshimen, buySistem, buyGachaSistem }
