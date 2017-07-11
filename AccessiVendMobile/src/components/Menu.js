import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, Dimensions, Platform, TextInput, Button, Touchable} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {UpdateSiteSettings} from "../actions/index";
import {Actions} from 'react-native-router-flux';

import {styles} from '../styles';

class Menu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <Button style={styles.mainButton}
                        title='Purchases'
                        color='#B7D433'
                        onPress={() => Actions.purchases()}/>
                <Button title='Users'
                        color='#B7D433'
                        onPress={() => Actions.users()}/>
                <Button title='Stock'
                        color='#B7D433'
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