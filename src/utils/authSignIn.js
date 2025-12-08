const SignIn = async (client, email, password) => {
    const { data, error } = await client.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            alert(error.message)
        }
        return data
}

export default SignIn