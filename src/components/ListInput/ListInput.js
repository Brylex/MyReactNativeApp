import React, {Component} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

export default class ListInput extends Component {
    state = {
        placeName: ""
    };

    placeNameChangeHandler = (text) => {
        this.setState({ placeName: text});
    };

    placeSubmitHandler = () => {
        if (this.state.placeName.trim() !== "") {
            this.props.placeAddHandler(this.state.placeName);
            this.setState({ placeName: ""});
        }
    };

    render () {
        return (
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.placeInput}
                    placeholder="An awesome place"
                    value={this.state.placeName} 
                    onChangeText={this.placeNameChangeHandler} />
                <Button 
                    title="Add" 
                    style={styles.placeButton}
                    onPress={this.placeSubmitHandler} />
            </View>
        )
    };
}

const styles = StyleSheet.create({
    inputContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    placeInput: {
        width: "70%",
    },
    placeButton: {
        width: "30%",
    }
});