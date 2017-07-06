import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Platform, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";

class Users extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View>
                <Text>Users page</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(Users);