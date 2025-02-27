import React,{useState} from 'react';
import { View,Text,SafeAreaView,AsyncStorage,StyleSheet,TextInput,TouchableOpacity } from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import api from '../services/api';

export default function Book(){
    const route = useRoute();
    const navigation = useNavigation();
    const { id } = route.params;
    const [date,setDate] = useState('');

    async function handleSubmit(){
       const user_id = await AsyncStorage.getItem('user');
       await api.post(`spots/${id}/bookings`,{
           date
       }, {
           headers: {user_id}
       })
       alert('Solicitação de reserva enviada');
       navigation.goBack();
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.label}>DATA DE INTERESSE *</Text>
                <TextInput 
                style={styles.input} 
                placeholder="Qual data voce quer reservar?" 
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
                />
                 <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Solicitar reserva</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
        marginTop: 30
    },

    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2
    },

    cancelButton: {
        height: 42,
        backgroundColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 10
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }

})