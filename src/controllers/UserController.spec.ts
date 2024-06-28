import { makeMockResponse } from "../__mocks__/mockResponse.mock"
import { UserService } from "../services/UserService"
import { UserController } from "./UserController"
import { Request } from "express"


describe('UserController', ()=>{
    const mockUsers = [
        {name: 'joana', email: 'joana@teste'}
    ]

    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn().mockReturnValue(mockUsers),
        deletetUsers: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService)

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'gabriel',
                email: 'gabriel@test'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message: 'User created'})
    })

    it('deve verificar a resposta de erro caso o usuário não informe o name', () => {
        const mockRequest = {
            body: {
                name: '',
                email: 'gabriel@test'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: invalid name' })
    })

    it('deve verificar a resposta de erro caso o usuário não informe o email', () => {
        const mockRequest = {
            body: {
                name: 'gabrie',
                email: ''
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: invalid email' })
    })

    it('Deve verificar se getAllUsers está sendo chamado', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(200)
        expect(mockResponse.state.json).toEqual(mockUsers)
    })

    it('Deve deletar qualquer user no db', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.deleteUsers(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(202)
        expect(mockResponse.state.json).toMatchObject({ message: "All users on the database were deleted" })
    })
})