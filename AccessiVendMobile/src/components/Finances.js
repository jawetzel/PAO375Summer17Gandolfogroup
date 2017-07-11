import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Platform, TextInput} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import {styles} from "../styles";

class Finances extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Text>Finances page</Text>
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


export default connect(mapStateToProps, mapDispatchToProps)(Finances);