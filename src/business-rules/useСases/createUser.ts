import type {Tuple2} from '../../../common/types/Tuple'

type CreateUserErrors = 'differentPasswords'|
    'weakPassword'|
    'incorrectEmail'|
    'emailAlreadyExist'

type CreateUserArgs = {
    name: string,
    password: Tuple2<string>,
    email: string,
}

type CreateUserResponse =  null|CreateUserErrors

function createUser({
    name,
    password,
    email,
}: CreateUserArgs): CreateUserResponse {
    if (password[0] !== password[1]) {
        return 'differentPasswords'
    }
    if (!email.includes('@')) {
        return 'incorrectEmail'
    }
    const passwordRegex = /^[\w!@#$%^&*]{6,16}$/
    if (!passwordRegex.exec(password[0])) {
        return 'weakPassword'
    }
    //TODO:Создание проверка пользователя с уникальным email в базе данных
    if (false) {
        return 'emailAlreadyExist'
    }
    //TODO:Добавление пользователя в базу данных
    return null
}

export {
    createUser,
}