import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from "../../app/redux/authSlice"
import { useLoginMutation } from "../../app/redux/api/authApiSlice"
import { Button, Input, FormGroup, Label } from 'reactstrap';

const Login = () => {
    // Need to remove error message on input
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const navigate = useNavigate()

    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()

    useEffect(() => {
        setErrMsg('')
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials({ ...userData }))
            setEmail('')
            setPassword('')
            navigate('/lists')
        } catch (err) {
            if (!err?.status) {
                setErrMsg('Error')
            } else if (err.status === 400) {
                setErrMsg('Missing Email or Password')
            } else if (err.status === 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg('Login Failed')
            }
        }
    }

    const handleEmailInput = (e) => setEmail(e.target.value)

    const handlePasswordInput = (e) => setPassword(e.target.value)

    const content = isLoading ? <h1>Loading...</h1> : (
        <section className="login">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

                        <h1>Login</h1>

                        <form onSubmit={handleSubmit}>
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
                                />
                            </FormGroup>
                            <FormGroup className="d-flex justify-content-center">
                                <Button color="primary" className="col-md-6">Sign In</Button>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
    return content
}
export default Login
