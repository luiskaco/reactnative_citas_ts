import React , {useState} from 'react';
import {
  Text, StyleSheet, View, FlatList
} from 'react-native';

// importando componentes
import Cita from './componentes/citas';
import Formulario from './componentes/formulario';

const App = () => {
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
  
  return (
    <>
      <View style={style.contenedor}>
          <Text style={style.titulo}>Administrador de Citas</Text>
          <Text style={style.titulo}>{ citas.length > 0 ? 'Administra tus citas': 'No hay citas, agrega una.'}</Text>

          <Formulario />
          
          <Text style={style.titulo}>{ citas.length > 0 ? 'Administra tus citas': 'No hay citas, agrega una.'}</Text>

          <FlatList 
              data={citas}
              renderItem={ ({item}) => <Cita item={item} eliminarPaciente={eliminarPaciente} />  }
              keyExtractor={ cita => cita.id}
          />
       

        {// haciendolo normal
        /*citas.map(cita =>(
            <View>
                <Text>
                  {cita.paciente}
                </Text>    
            </View>
        ))*/} 
      </View>
    </>
  );
};

const style = StyleSheet.create({
  contenedor:{
      backgroundColor: '#AA0768',
      flex:1
  },  
  titulo :{
    color:'#fff',
    marginTop:40,
    marginBottom:20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
  }
});

export default App;
