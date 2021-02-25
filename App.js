import React , {useState} from 'react';
import {
  Text, 
  StyleSheet, 
  View, 
  FlatList, // para listar con alta perfomance
  TouchableHighlight, // Para crear btn con stilos
  TouchableWithoutFeedback, // No resalta como el de arriba
  Keyboard,
  Platform,   // Permite corre codigo especifico para IOS o ANDROID
} from 'react-native';

// importando componentes
import Cita from './componentes/citas';
import Formulario from './componentes/formulario';

const App = () => {
    // STATE
    const [mostrarform, setMostrarform] = useState(false);

  // Definir el Star ede Citas
  const [citas, setCitas] = useState([
    {id:'1', paciente: 'hook', propietario:'Luis', sintomas : "No come" },
    {id:'2', paciente: 'Redux', propietario:'Marcos', sintomas : "No Duerme" },
    {id:'3', paciente: 'Native', propietario:'Florencio', sintomas : "No Canta" },
    {id:'4', paciente: 'Context', propietario:'Florencio', sintomas : "No Canta" }
  ]);

  // Elimina los pacientes 

  const eliminarPaciente = id =>{
     setCitas((citasActuales) =>{
        return citasActuales.filter(cita => cita.id !== id);
     });
  }

  // Mostrar formulario
  const mostrarFormulario = () =>{
      setMostrarform(!mostrarform);
      // Cambiandolo de true a false e viceversa
  }

  // Ocultar Teclado
  const cerrarTeclado = () =>{
    Keyboard.dismiss(); // Oculta el teclado
  }
  
  return (
    <>
      {/* Para aplicarlo de manera global */}
      <TouchableWithoutFeedback onPress={() => cerrarTeclado()}> 

        <View style={styles.contenedor}>
            <Text style={styles.titulo}>Administrador de Citas</Text>
          
            <View>
                <TouchableHighlight onPress={() => mostrarFormulario()} style={styles.btnMostrarForm}>
                    <Text style={styles.textoMostrarForm}>{mostrarform ? 'Regresar al listado':'Crear Nueva Cita' }  </Text>
                </TouchableHighlight>
            </View>

          <View style={styles.contenido}>

                {/* Condicionando */}
            
                {mostrarform ? (
                    // Mostrar formulario
                    <>
                      <Text style={styles.titulo}>Crear Nueva Cita</Text>

                      <Formulario 
                          citas={citas}
                          setCitas={setCitas}
                          setMostrarform={setMostrarform}
                      />
                    </>
                ) : (
                    <>
                      {/* Mostrar Listado */}
                      <Text style={styles.titulo}> {citas.length > 0 ? 'Administra tus citas' : 'No hay citas, agrega una'} </Text>
                      <FlatList 
                          style={styles.listado}
                          data={citas}
                          renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />  }
                          keyExtractor={ cita => cita.id}
                      />
                    </>
                )}

          </View>
        

          {// haciendolo normal
          /*citas.map(cita =>(
              <View>
                  <Text>
                    {cita.paciente}
                  </Text>    
              </View>
          ))*/} 
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1
  },
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ?  40  : 20 ,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }, 
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
      padding: 10,
      backgroundColor:'#7d024e',
      marginVertical: 10
  },
  textoMostrarForm: {
      color: '#FFF',
      fontWeight: 'bold',
      textAlign: 'center'
  },
 
});

export default App;
