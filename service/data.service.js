
//import jwt
const jwt = require('jsonwebtoken')

userDetails = {       //object of objects
    1000: { acno: 1000, username: 'Drisya', password: 1000, balance: 17000, transaction: [] },
    1001: { acno: 1001, username: 'Nandini', password: 1001, balance: 15000, transaction: [] },
    1002: { acno: 1002, username: 'Athira', password: 1002, balance: 12000, transaction: [] },
}






//function to register an user
const register = (acno, username, password) => {
    if (acno in userDetails) {
        return {
            statusCode: 401,
            status: false,
            message: 'user already registered'
        }
    }
    else {
        userDetails[acno] = {
            acno,
            username,
            password,
            balance: 0,
            transaction: []

        }
        console.log(userDetails);
        return {
            statusCode: 200,
            status: true,
            message: 'successfully registered'
        }

    }
}



const login = (acno, pswd) => {
    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            currentuser = userDetails[acno]['username']; //login name display
            currentAcno = acno;
          //token generate
          const token=jwt.sign({currentAcno:acno},'superkey2020')

            return {
                statusCode: 200,
                status: true,
                message: 'login successfull',
                currentuser,
                currentAcno,
                token
            }


        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'incorrect password'
            }

        }
    }
    else {
        return {
            statusCode: 401,
            status: false,
            message: 'invalid user'
        }
    }
}



const deposit = (acno, pswd, amt) => {


    var amount = parseInt(amt);
    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            userDetails[acno]['balance'] += amount;
            userDetails[acno]['transaction'].push({
                type: 'Credit',
                amount
            })
            console.log(userDetails);
            return {
                statusCode: 200,
                status: true,
                message: `${amount} is credited and new balance is  ${userDetails[acno]['balance']}`
            }
            

        }
        
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'incorrect password'
            }
        }
    }

    else {
        return {
            statusCode: 401,
            status: false,
            message: 'invalid user'
        }

    }

}





const withdraw = (acno, pswd, amt) => {

    var amount = parseInt(amt);
    if (acno in userDetails) {
        if (pswd == userDetails[acno]['password']) {
            if (userDetails[acno]['balance'] > amount) {
                userDetails[acno]['balance'] -= amount;

                userDetails[acno]['transaction'].push({
                    type: 'Debit',
                    amount
                })
                console.log(userDetails);

                return {
                    statusCode: 200,
                    status: true,
                    message: `${amount} is debited and new balance is  ${userDetails[acno]['balance']}`
                }

            }
            else {
                return {
                    statusCode: 401,
                    status: false,
                    message: 'insufficient balance'
                }
            }

        }
        else {
            return {
                statusCode: 401,
                status: false,
                message: 'incorrect password'
            }

        }
    }
    else {
        return {
            statusCode: 401,
            status: false,
            message: 'invalid user'
        }

    }

}



const getTransaction = (acno) => {
    return {
        statusCode: 200,
        status: true,
        transaction: userDetails[acno]['transaction']
    }

}








module.exports = {
    register,
    login,
    deposit,
    withdraw,
    getTransaction
}

































