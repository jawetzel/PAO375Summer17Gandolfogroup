import React, { Component } from 'react';
import './App.css';
import request from "request";

import SmartFoodImage from './Images/SmartFoood.jpg';

class App extends Component {
    constructor(props) {
        super(props);

        this.Login = this.Login.bind(this);
        this.Logout = this.Logout.bind(this);
        this.LoadOrders = this.LoadOrders.bind(this);



        let token  = localStorage.getItem('token');
        console.log(token);
        if(token){
            this.state = {
                LoggedIn: true,
                username: '',
                password: '',
                sessionToken: token,
                orders: []
            };
            this.LoadOrders();
        } else {
            this.state = {
                LoggedIn: false,
                username: '',
                password: '',
                sessionToken: '',
                orders: []
            };
        }
    }

    Login(){
        if(this.state.username.length > 0 && this.state.password.length > 0){

            let options = {
                method: 'POST',
                url: 'http://accessivendapi.azurewebsites.net/api/Admin/login',
                headers: { 'content-type': 'application/json' },
                body: { Username: this.state.username.trim().toLowerCase(), Password: this.state.password.trim() },
                json: true
            };
            let self = this;
            request(options, function (error, response, body) {
                if (error) throw new Error(error);
                if(body.success){
                    self.setState({
                        sessionToken: body.session.token,
                        password: '',
                        LoggedIn: true
                    });
                    self.LoadOrders();
                    localStorage.setItem('token', body.session.token);
                }
            });
        }
    }
    Logout(){
        this.setState({
            sessionToken: '',
            username: '',
            password: '',
            LoggedIn: false,
            orders: []
        });
        localStorage.clear();
        window.location.reload();
    }

    LoadOrders(){
        let options = {
            method: 'GET',
            url: 'http://accessivendapi.azurewebsites.net/api/Drink/listAllDrinkOrders'
        };
        let self = this;
        request(options, function (error, response, body) {
            if (error) throw new Error(error);
            let resp = JSON.parse(response.body);
            if(resp.success){
                console.log(resp.orders);
                self.setState({ orders: resp.orders, error: false });
            } else {
                console.log('err');
                self.setState({error: true, errorMessage: 'connection error'});
            }
            setTimeout(() => {
                self.LoadOrders();
            }, 3000)
        });

    }

    render() {
        if(!this.state.LoggedIn){
            return (
                <div className="container App centerContents">
                    <div className="loginContainer block centerContents fullSize">
                        <div>
                            <div className="titleName">
                                AccessiVend
                            </div>
                            <div>
                                <input type="text"
                                       className="loginInput centerContents"
                                       value={this.state.username}
                                       onChange={event => this.setState({username: event.target.value})}
                                       placeholder="Username"/>
                            </div>
                            <div>
                                <input type="password"
                                       className="loginInput centerContents"
                                       value={this.state.password}
                                       onChange={event => this.setState({password: event.target.value})}
                                       placeholder="Username"/>
                            </div>
                            <div>
                                <button onClick={() => this.Login()}
                                        className="loginInput centerContents loginButton">Login</button>
                            </div>
                        </div>
                        <img className="IconImage" src={SmartFoodImage}/>
                    </div>
                </div>
            );
        }
        return (
            <div className="container App centerContents appContainer">
                <div className="block centerContents fullSize">
                    <div className="customTable">
                        <div>
                            <button className="ordersButton" onClick={this.Logout}>Logout</button>
                            <button className="ordersButton" onClick={this.LoadOrders}>Reload Orders</button>
                        </div>
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th className="centerContents">Name</th>
                                <th className="centerContents">Drink</th>
                                <th className="centerContents">Price</th>
                            </tr>

                            </thead>

                            <tbody className="tableBody">
                            {this.state.orders.map((order, key)=> {
                                return (
                                    <tr key={key}>
                                        <td>{order.userName}</td>
                                        <td>{order.drinkTypeDescr}</td>
                                        <td>{order.price}</td>
                                    </tr>)
                            })}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
