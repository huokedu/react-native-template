'use strict';
var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    TouchableOpacity,
    Navigator,
} = ReactNative;

var SplashScreen = require('@remobile/react-native-splashscreen');
var PersonInfo = require('../person/PersonInfo.js');
var Dialogs = require('./react-native-dialogs');
var Camera = require('./react-native-camera');
var Sqlite = require('./react-native-sqlite-storage');
var Contacts = require('./react-native-contacts');
var FileTransfer = require('./react-native-file-transfer');
var MarqueeLabel = require('./react-native-marquee-label');
var Zip = require('./react-native-zip');
var RefreshInfiniteListview = require('./react-native-refresh-infinite-listview');
var Panel = require('./react-native-3d-panel');
var Marquee = require('./react-native-marquee');
var CameraRollPicker = require('./react-native-camera-roll-picker');

var modules = [
    {title:'react-native-camera-roll-picker', image: app.img.common_point, module:CameraRollPicker},
    {title:'react-native-marquee', image: app.img.common_point, module:Marquee},
    {title:'react-native-3d-panel', image: app.img.common_point, module:Panel},
    {title:'react-native-refresh-infinite-listview', image: app.img.common_point, module:RefreshInfiniteListview},
    {title:'react-native-dialogs', image: app.img.common_point, module:Dialogs},
    {title:'react-native-camera', image: app.img.common_point, module:Camera},
    {title:'react-native-sqlite-storage', image: app.img.common_point, module:Sqlite},
    {title:'react-native-contacts', image: app.img.common_point, module:Contacts},
    {title:'react-native-file-transfer', image: app.img.common_point, module:FileTransfer},
    {title:'react-native-zip', image: app.img.common_point, module:Zip},
    {title:'react-native-marquee-label', image: app.img.common_point, module:MarqueeLabel},
];


module.exports = React.createClass({
    statics: {
        title: CONSTANTS.APP_NAME,
        leftButton: { image: app.img.common_left_menu, handler: ()=>{
            app.navigator.push({
                component: PersonInfo,
                fromLeft: true,
            });
        }},
    },
    componentWillMount() {
        app.toggleNavigationBar(true);
        SplashScreen.hide();
    },
    getInitialState: function() {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(modules),

        };
    },
    _onPressRow(obj) {
        var route = {
            title: obj.title,
            component: obj.module,
        };
        app.navigator.push(route);
    },
    renderSeparator(sectionID, rowID) {
        return (
            <View style={styles.separator} key={rowID}/>
        );
    },
    renderRow(obj, sectionID, rowID) {
        return (
            <View key={rowID}>
                <TouchableOpacity
                    onPress={this._onPressRow.bind(null, obj)}
                    underlayColor="#EEB422">
                    <View style={styles.row}>
                        <Image
                            resizeMode='stretch'
                            source={obj.image}
                            style={styles.icon} />
                        <Text style={styles.title} >
                            {obj.title}
                        </Text>
                        <Image
                            resizeMode='contain'
                            source={app.img.common_go}
                            style={styles.arrow} />
                    </View>
                </TouchableOpacity>
            </View>
        )
    },
    render: function() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSeparator={this.renderSeparator}
                    />
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        height:60,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    list: {
        alignSelf:'stretch'
    },
    icon: {
        marginLeft: 10,
        width:25,
        height:25,
        marginRight: 10,
    },
    title: {
        width:sr.w-70
    },
    separator: {
        height: 1,
        backgroundColor: '#CCC'
    },
    arrow: {
        width: 15,
        height: 26,
    },
});
