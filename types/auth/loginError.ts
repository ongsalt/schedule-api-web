export type LoginError = {
    wrongUsernameOrPassword?: boolean
    missingField?: boolean
}

export const LoginErrorText = {
    wrongUsernameOrPassword: "Username or password is incorrect.",
    missingField: "Some field is missing"
}