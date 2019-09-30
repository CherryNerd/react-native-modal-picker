'use strict';

import React, {Component} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import styles from './style';
import BaseComponent from './BaseComponent';

let componentIndex = 0;

const defaultProps = {
    data: [],
    onChange: () => {
    },
    initValue: 'Select me!',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
    modalVisible: false,
};

export default class ModalPicker extends Component {

    constructor() {

        super();

        this.state = {
            animationType: 'slide',
        };
    }

    onChange = (item) => {
        this.props.onChange(item);
    };

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle, this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
        return (
            <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
                <View style={[styles.optionStyle, this.props.optionStyle]}>
                    <Text style={[styles.optionTextStyle, this.props.optionTextStyle]}>{option.label}</Text>
                </View>
            </TouchableOpacity>)
    }

    renderOptionList() {
        var options = this.props.data.map((item) => {
            if (item.section) {
                return this.renderSection(item);
            } else {
                return this.renderOption(item);
            }
        });

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]} key={'modalPicker' + (componentIndex++)}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps>
                        <View style={{paddingHorizontal: 10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.props.onCancel}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text
                                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>);
    }

    render() {

        const dp = (
            <Modal transparent={true} ref="modal" visible={this.props.modalVisible} onRequestClose={this.close}
                   animationType={this.state.animationType}>
                {this.renderOptionList()}
            </Modal>
        );

        return (
            <View style={this.props.style}>
                {dp}
            </View>
        );
    }
}

ModalPicker.defaultProps = defaultProps;
