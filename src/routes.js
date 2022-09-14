import React from 'react';
import { BrowserRouter, Routes as Switch, Route } from "react-router-dom";

import Login from './pages/Login';
import Books from "./pages/Books";
import NewBook from "./pages/NewBook";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact="true" path="/" element={<Login/>}/>
                <Route path="/books" element={<Books/>}/>
                <Route path="/book/new/:bookId" element={<NewBook/>}/>
            </Switch>
        </BrowserRouter>
    );
}