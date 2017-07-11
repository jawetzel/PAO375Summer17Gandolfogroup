import React, {Component} from 'react';
import {Text, View, Image, Dimensions, Platform, TextInput, Button, Keyboard, Touchable} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import {styles} from '../styles';

import Logo from '../sources/smartFood.png';
import {LoginCall} from "../sources/ApiCalls";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: {text: ''},
            password: {text: ''},
            showErrorMessage: false
        };
        this.login = this.login.bind(this);
    }

    login(){
        let username = this.state.username.text.trim();
        let password = this.state.password.text.trim();
        if(username.length > 0 && password.length > 0){
            LoginCall({Username: username, Password: password}, response => {
                if(!response.body.success){
                    this.setState({showErrorMessage: true});
                    this.setState({password: {text: ''}});
                } else {
                    Keyboard.dismiss();
                    let siteSettings = Object.assign({}, this.props.SiteSettings);
                    siteSettings.IsLoggedIn = true;
                    siteSettings.username = this.state.username;
                    siteSettings.token = response.body.session.token;
                    this.props.UpdateSiteSettings(siteSettings);
                }
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.showErrorMessage &&
                <Text style={styles.ErrorMessage}>Login Failed</Text>
                }
                <TextInput style={styles.textField}
                           underlineColorAndroid="transparent"
                           ref='username'
                           placeholder="Username"
                           placeholderTextColor="black"
                           keyboardType="default"
                           returnKeyLabel="next"
                           padding={5}
                           marginTop={10}
                           autoCapitalize="none"
                           autoCorrect={false}
                           onChangeText={(text) => {
                               this.setState({
                                   username: {text}
                               });
                           }} />
                <TextInput style={styles.textField}
                           underlineColorAndroid="transparent"
                           ref='password'
                           placeholder="Password"
                           placeholderTextColor="black"
                           keyboardType="default"
                           returnKeyLabel="next"
                           secureTextEntry={true}
                           padding={5}
                           marginTop={10}
                           marginBottom={20}
                           autoCapitalize="none"
                           autoCorrect={false}
                           value={this.state.password.text}
                           onChangeText={(text) => {
                               this.setState({
                                   password: {text}
                               });
                           }} />
                <Button style={styles.mainButton}
                        title='Login'
                        color='#B7D433'
                        onPress={() => this.login()}>
                </Button>
                <Image source={Logo} style={styles.logoImage} />
            </View>
        )
    }

}

function mapStateToProps(state) {
    return{
        SiteSettings: state.SiteSettingsReducer,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        UpdateSiteSettings: UpdateSiteSettings,
    }, dispatch )

}


export default connect(mapStateToProps, mapDispatchToProps)(Login);