import React, {useState} from 'react';
import { 
        Text,
        View, 
        StyleSheet, 
        TextInput, 
        Button, 
        ScrollView,
        TouchableHighlight ,
        Alert,
    } from 'react-native';

// importando paquete
import DateTimePickerModal from "react-native-modal-datetime-picker";
import shortid from 'shortid';

const Formulario = ({citas,setCitas,setMostrarform}) => {
    // Definiendo States
    const [paciente, setPaciente] = useState('');
    const [propietario, setPropietario] = useState('');
    const [telefono, setTelefono] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
    const [sintoma, setSintoma] = useState('');


    // Paquete de data picker
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const confirmarFecha = (date) => {
      //formateando fecha
      const opciones = {year: 'numeric', month:'long', day:'2-digit'};
      setFecha(date.toLocaleDateString('es-ES',opciones));

     // console.warn("A date has been picked: ", date);
      hideDatePicker();
    };

    // Muestra o oculta el time picker
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    const showTimePicker = () => {
        setTimePickerVisibility(true);
      };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const confirmarHora = (hora) => {
          //formateando fecha
       // const opciones2 = {hour:'numeric',minute:'2-digit', hour12: false};
       const opciones2 = {hour:'numeric',minute:'2-digit'};
       setHora(hora.toLocaleString('en-US', opciones2));
        hideTimePicker();
    };

    // Crear Nueva Cita 
    const crearNuevaCita = () =>{

        // Validar
        if(paciente.trim()==='' || propietario.trim==='' || telefono.trim()===''||
          fecha.trim() === '' || hora.trim()===''|| sintoma.trim()===''
          ){
              // Falla la validacion
              console.log('Algo fallo');
              mostrarAlerta();
              return ;
          }

          // Crear una nueva cita
          const cita = {paciente, propietario, telefono, fecha, hora, sintoma};
         
          cita.id=shortid.generate();// Genera id unico

          const citasNuevo = [...citas, cita];
          setCitas(citasNuevo);
          console.log(citasNuevo);

         // Ocultar formulario
         setMostrarform(false);

         // Resetear formulario
          
    }
    // Muestra alerta si falla la validacion
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error', // Esto va ser el titulo
            'Todos los campos son obligatorio',
            [{
                text:'Ok' // Arreglo
            }]
        );
    }

    return ( 
        <>  
            <ScrollView style={styles.formulario}>
                <View>
                    <Text style={styles.label}>Paciente: </Text>
                    <TextInput 
                        keyboardType='default'
                        onChangeText={(texto) => setPaciente(texto)}
                        style={styles.input}
                    ></TextInput>
                </View>
            
                <View>
                    <Text style={styles.label}>Propietario: </Text>
                    <TextInput 
                        keyboardType='default'
                        onChangeText={(texto) => setPropietario(texto)}
                        style={styles.input}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Telefono de Contacto: </Text>
                    <TextInput 
                        keyboardType='numeric'
                        onChangeText={(texto) => setTelefono(texto)}
                        style={styles.input}
                    ></TextInput>
                </View>
                <View>
                    <Text style={styles.label}>Fecha: </Text>
                    <Button title="Selecionar Fecha" onPress={showDatePicker} />
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={confirmarFecha}
                        onCancel={hideDatePicker}
                        locale="es_ES"
                        headerTextIOS="Elige la fecha"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                        is24Hour
                    />
                    <Text>{fecha}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Selecionar hora" onPress={showTimePicker} />
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={confirmarHora}
                        onCancel={hideTimePicker}
                        locale="es_ES"
                        headerTextIOS="Elige una hora"
                        cancelTextIOS="Cancelar"
                        confirmTextIOS="Confirmar"
                    />
                <Text>{hora}</Text>
                </View>
                <View>
                    <Text style={styles.label}>Sintomas: </Text>
                    <TextInput 
                        multiline
                        keyboardType='default'
                        onChangeText={(texto) => setSintoma(texto)}
                        style={styles.input}
                    ></TextInput>  
                </View>

                <View style={styles.contentBoton}>
                    <TouchableHighlight onPress={() => crearNuevaCita()} style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}> Crear Nueva Cita </Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>  
        </>
     );
}

const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
       

     },
    label:{
        fontWeight: 'bold',
        fontSize:18,
        marginTop:20
    },
    input:{
        marginTop: 10,
        height: 50,
        borderColor:'#e1e1e1',
        borderWidth:1,
        borderStyle:'solid'
    },
    btnSubmit:{
        padding: 10,
        backgroundColor: '#7d024e',
        marginVertical: 10
    },
    textoSubmit:{
        color:'#fff',
        fontWeight:'bold',
        textAlign: 'center'
    },
    contentBoton:{
        marginBottom:20
    }
});
 
export default Formulario;