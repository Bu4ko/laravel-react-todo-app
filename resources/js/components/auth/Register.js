import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from "../../app/redux/authSlice"
import { useRegisterMutation } from "../../app/redux/api/authApiSlice"
import { Button, Input, FormGroup, Label } from 'reactstrap'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [register, { isLoading }] = useRegisterMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [email, password, repeatPassword])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== repeatPassword) {
            let m = password
            let r = repeatPassword
            setErrMsg('Passwords does not match')
            return
        }
        try {
            const userData = await register({ name, email, password }).unwrap()
            dispatch(setCredentials({ ...userData }))
            setEmail('')
            setPassword('')
            navigate('/lists')
        } catch (err) {
            if (!err?.status) {
                setErrMsg('Error')
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Registration Failed')
            }
        }
    }

    const handleNameInput = (e) => setName(e.target.value)
    const handleEmailInput = (e) => setEmail(e.target.value)
    const handlePasswordInput = (e) => setPassword(e.target.value)
    const handleRepeatPasswordInput = (e) => setRepeatPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="register">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <h1>Register</h1>
                        <form onSubmit={handleSubmit}>
                            <FormGroup>
                                <Label for="name">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={handleNameInput}
                                    placeholder="name"
                                    autoComplete="off"
                                    type="text"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailInput}
                                    placeholder="email"
                                    type="email"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">
                                    Password
                                </Label>
                                <Input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordInput}
                                    placeholder="password"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="repeatPassword">
                                    Repeat password
                                </Label>
                                <Input
                                    type="password"
                                    id="repeatPassword"
                                    name="repeatPassword"
                                    value={repeatPassword}
                                    onChange={handleRepeatPasswordInput}
                                    placeholder="repeat password"
                                    required
                                />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-center">
                                <Button color="primary" className="col-md-6">Register</Button>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )

    return content
}
export default Register
