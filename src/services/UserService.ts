export interface IDB{
    name: string
    email: string
}


const db = [
    {
        name: "Joana",
        email: "joana@dio.com"
    }
]

export class UserService {
    db: IDB[]

    constructor(database = db){
        this.db = database
    }


    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log('DB atualizado', this.db)
    }

    getAllUsers = (): IDB[] => {
        return this.db
    }

    deletetUsers = () => {
        this.db.splice(0, this.db.length)
    }
}