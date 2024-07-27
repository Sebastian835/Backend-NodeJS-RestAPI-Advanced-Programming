class Users {
    constructor(username, id_rol, fullName, password, state) {
        this.username = username; // anyelec
        this.id_rol = id_rol; // 2: Operador
        this.fullName = fullName; // 
        this.password = password; // encrypted 
        this.state = state; // 0: inactive, 1: active
    }
}

module.exports = Users;