import {StyleSheet, Dimensions} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#6D6E71',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 30,
    },
    textField: {
        width: Dimensions.get('window').width * .8,
        height: 50,
        backgroundColor: 'white',
    },
    logoImage: {
        resizeMode: 'contain',
        width: Dimensions.get('window').width * .7,
    },

    companyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    watsonImage: {
        resizeMode: 'contain',
        height: Dimensions.get('window').height * 0.26,
        width: Dimensions.get('window').width * 0.68,
    },
    bluemixImage: {
        resizeMode: 'contain',
        height: Dimensions.get('window').height * 0.20,
        width: Dimensions.get('window').width * 0.60,
    },
    appText: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    notrsText: {
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        textAlign: 'center',
    }
});