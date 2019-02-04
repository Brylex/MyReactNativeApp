import React, {Component} from 'react';
import {View, Image, Button, StyleSheet} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import imagePlaceholder from '../../assets/bled.jpg';

class ImageSelector extends Component {
    state = {
        pickedImage: null,
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker({title: "Pick image!"}, 
            response => {
                if (response.didCancel) {
                    console.log("User canceled.");
                } else if (response.error) {
                    console.log("Error", response.error);
                } else {
                    this.setState({
                        pickedImage: {uri: response.uri}
                    });
                }
                this.props.onImagePicked({
                    uri: response.uri, 
                    base64: response.data
                });
            }
        )
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.placeholder}>
                    <Image source={this.state.pickedImage} style={styles.previewImage}/>
                </View>
                <View style={styles.button}>
                    <Button title="Pick image" onPress={this.pickImageHandler}/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        alignItems: "center",
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150,
    },
    button: {
        margin: 8,
    },
    previewImage: {
        width: "100%",
        height: "100%",
    },
})

export default ImageSelector;