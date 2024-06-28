import { IDB, UserService } from "./UserService";


describe('UserService', () => {
    const mockDB: IDB[] = [
        {
            name: 'algum',
            email: 'algum@teste'
        }
    ]
    const userService = new UserService(mockDB);


    it('Deve adicionar um user ao db', () => {
        const mockConsole = jest.spyOn(global.console, 'log')
        userService.createUser('gabriel', 'gabriel@andreoli');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDB)
    })

    it('Deve retornar todo o banco de dados', () => {
        const retorno = userService.getAllUsers()
        expect(retorno).toEqual(mockDB)
    })

    it('Deve deletar tudo que há no db', () => {
        userService.deletetUsers()
        expect(mockDB.length).toBe(0)
    })
})