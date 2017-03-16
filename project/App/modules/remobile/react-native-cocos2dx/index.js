'use strict';

var React = require('react');
var ReactNative = require('react-native');
var {
    StyleSheet,
    View,
} = ReactNative;

var resolveAssetSource = require('resolveAssetSource');
var Cocos2dx = require('@remobile/react-native-cocos2dx');

module.exports = React.createClass({
    renderCocos2dx() {
        return (params)=> {
            cc.game.onStart = function(){
                var MyScene = cc.Scene.extend({
                    onEnter:function () {
                        this._super();
                        var size = cc.director.getWinSize();

                        var sprite = cc.Sprite.create(params.img.qq);
                        sprite.setPosition(size.width / 2, size.height / 2 - 200);
                        sprite.setScale(0.8);
                        this.addChild(sprite, 0);

                        var sprite = cc.Sprite.create(params.img.weixin);
                        sprite.setPosition(size.width / 2, size.height / 2);
                        sprite.setScale(0.8);
                        this.addChild(sprite, 0);

                        var label = cc.LabelTTF.create("Hello World", "Arial", 40);
                        label.setPosition(size.width / 2, size.height / 2 + 200);
                        label.setColor(255, 0,255);
                        this.addChild(label, 1);
                    }
                });
                cc.director.runScene(new MyScene());
            };
            cc.game.run();
        }
    },
    render () {
        const params = {
            img: {
                qq: resolveAssetSource(require('./img/qq.img')).uri,
                weixin: resolveAssetSource(require('./img/weixin.img')).uri,
            }
        };
        return (
            <View style={styles.container}>
                <Cocos2dx
                    renderCocos2dx={this.renderCocos2dx()}
                    cocos2dxParams={params}
                    width={sr.tw}
                    height={sr.tch}
                    />
            </View>
        );
    },
});

var styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
