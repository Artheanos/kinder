import React from "react";
import {render, screen} from '@testing-library/react';
import LoginForm from "./welcome/auth/Login/LoginForm";
import {BrowserRouter, Route} from "react-router-dom";

test('renders learn react link', () => {
    let x = <BrowserRouter><Route component={LoginForm} switchForm={() => undefined}/></BrowserRouter>;
    render(x);
    let emails = screen.getByText(/email/i);
    if (emails.nextElementSibling === null)
        return;

    let email = emails.nextElementSibling.children[0] as HTMLInputElement;
    // let password = screen.getByText(/password/i).nextElementSibling!.children[0];

    expect(email).toBeInTheDocument();
});
