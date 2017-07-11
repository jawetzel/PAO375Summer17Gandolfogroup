import React, {Component} from 'react';
import {Text, View, Image, Dimensions, Platform, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import {styles} from "../styles";
import {ListAllUsers, LoginAdmin} from '../ApiCalls/AccessiVendApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };
        this.login = this.login.bind(this);
    }

    login(){
        ListAllUsers().end((res, err) => {
            console.log(res);
            console.log(err);
        });
        LoginAdmin({
            Username: this.state.username,
            Password: this.state.password
        }).end((res, err) => {
            console.log(res)
        });
        let siteSettings = Object.assign({}, this.props.SiteSettings);
        siteSettings.IsLoggedIn = true;
        siteSettings.username = this.state.username;
        this.props.UpdateSiteSettings(siteSettings);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Please login</Text>
                <TextInput ref='username'
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
                <TextInput style={Styles.textField}
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
                           onChangeText={(text) => {
                               this.setState({
                                   password: {text}
                               });
                           }} />
                <Button title='Login'
                    width={200}
                    color='#B7D433'
                    onPress={() => this.login()}>
                </Button>
                <Image source={Logo} style={Styles.logoImage} />
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