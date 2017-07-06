import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Platform, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import {Actions} from 'react-native-router-flux';
class Menu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <Button title='Finances'
                        width={200}
                        backgroundColor='#3b5998'
                        onPress={() => Actions.finances()}/>
                <Button title='Users'
                        width={200}
                        backgroundColor='#3b5998'
                        onPress={() => Actions.users()}/>
                <Button title='Stock'
                        width={200}
                        backgroundColor='#3b5998'
                        onPress={() => Actions.stock()}/>
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu);