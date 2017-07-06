import React, {Component} from 'react';
import {connect} from 'react-redux';
import {StyleSheet, Text, StatusBar, View} from 'react-native';
import {Modal, Router, Scene} from "react-native-router-flux";
import {bindActionCreators} from "redux";
import Spinner from 'react-native-loading-spinner-overlay';
import {Actions} from 'react-native-router-flux';


import {UpdateSiteSettings} from "../actions/index";
import Login from "./Login";
import Stock from "./Stock";
import Finances from "./Finances";
import Users from "./Users";
import Menu from "./Menu";


const Scenes = Actions.create(
    <Scene key='modal' component={Modal}>
        <Scene key='root'>

            <Scene key='home' tabs={true} initial={true}>

                <Scene key='users'
                       component={Users}
                       title='AccessiVend' iconName='ios-home-outline'/>

                <Scene key='finances'
                       component={Finances}
                       title='Home' iconName='ios-home-outline'/>

                <Scene key='stock'
                       component={Stock}
                       title='Home' iconName='ios-home-outline'/>

            </Scene>

            <Scene key='menu'
                   component={Menu}
                   title='Menu' iconName='ios-home-outline'/>

            <Scene key='login' direction='vertical'>
                <Scene key='loginModal'
                       component={Login}
                       title='AcessiVend'
                       panHandlers={null} />
            </Scene>


            </Scene>
    </Scene>

    );

const ConnectedRouter = connect()(Router);

class RootRouter extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        if (!this.props.SiteSettings.IsLoggedIn) {
            Actions.login();
        }
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.SiteSettings.IsLoggedIn !== nextProps.SiteSettings.IsLoggedIn) {
            if (!nextProps.SiteSettings.IsLoggedIn) {
                Actions.login();
            } else {
                Actions.menu();
            }
        }
    }


    render() {
        return (
            <View style={{flex:1}}>
                <ConnectedRouter scenes={Scenes} />
                <Spinner visible={this.props.SiteSettings.LoadingSpinnerActive}
                         color='white'
                         overlayColor='rgba(0, 0, 0, 0.60)' />
            </View>
        );
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


export default connect(mapStateToProps, mapDispatchToProps)(RootRouter);