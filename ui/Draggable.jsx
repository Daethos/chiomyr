import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import DragList, {DragListRenderItemInfo} from 'react-native-draglist';

function keyExtractor(str) {
    return str;
};

function renderItem(info) {
    const {item, onDragStart, onDragEnd, isActive} = info;

    return (
        <TouchableOpacity
            key={item}
            onPressIn={onDragStart}
            onPressOut={onDragEnd}>
            <Text>{item}</Text>
        </TouchableOpacity>
    );
};
