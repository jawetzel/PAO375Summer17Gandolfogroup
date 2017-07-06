import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Platform, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import Icon from 'react-native-vector-icons/FontAwesome';

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
        let siteSettings = Object.assign({}, this.props.SiteSettings);
        siteSettings.IsLoggedIn = true;
        siteSettings.username = this.state.username;
        this.props.UpdateSiteSettings(siteSettings);
    }


    render() {
        return (
            <View>
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
                <TextInput ref='password'
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
                    backgroundColor='#3b5998'
                    onPress={() => this.login()}>
                </Button>

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