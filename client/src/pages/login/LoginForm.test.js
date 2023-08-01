import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import LoginForm from './LoginForm'

jest.mock('../../hooks/useLogin', () => ({
  useLogin: jest.fn(() => ({
    login: jest.fn(),
    error: null,
    isLoading: false,
  })),
}))

describe('LoginForm', () => {
  it('should render the form correctly', () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />)
    expect(getByText('LOGIN')).toBeInTheDocument()
    expect(getByPlaceholderText('Username')).toBeInTheDocument()
    expect(getByPlaceholderText('Password')).toBeInTheDocument()
    expect(getByText('Submit')).toBeInTheDocument()
  })

  it('should call the login function with the correct arguments when the form is submitted', async () => {
    const { getByText, getByPlaceholderText } = render(<LoginForm />)
    const usernameInput = getByPlaceholderText('Username')
    const passwordInput = getByPlaceholderText('Password')
    const submitButton = getByText('Submit')

    fireEvent.change(usernameInput, { target: { value: 'testuser' } })
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } })
    fireEvent.click(submitButton)

    const useLoginMock = require('../../hooks/useLogin').useLogin
    expect(useLoginMock).toHaveBeenCalled()
    expect(useLoginMock().login).toHaveBeenCalledWith('testuser', 'testpassword')
  })

  it('should show an error message if there is an error', () => {
    const { getByText, rerender } = render(<LoginForm />)

    rerender(<LoginForm error="Error occurred" />)
    expect(getByText('Error occurred')).toBeInTheDocument()
  })

  it('should disable the submit button while loading', () => {
    const { getByText, rerender } = render(<LoginForm />)
    const submitButton = getByText('Submit')
    expect(submitButton).not.toBeDisabled()

    rerender(<LoginForm isLoading />)
    expect(submitButton).toBeDisabled()
  })
})
