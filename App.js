import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [tarefa, setTarefa] = useState('');
  const [tarefas, setTarefas] = useState([]);

  
  useEffect(() => {
    AsyncStorage.getItem('minhasTarefas').then(tarefasSalvas => {
      if (tarefasSalvas) setTarefas(JSON.parse(tarefasSalvas));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
  }, [tarefas]);

  function adicionarTarefa() {
    if (!tarefa) return;
    setTarefas([...tarefas, tarefa]);
    setTarefa('');
  }

  function removerTarefa(index) {
    const novas = tarefas.filter((_, i) => i !== index);
    setTarefas(novas);
  }

  function limparTudo() {
    setTarefas([]);
    AsyncStorage.removeItem('minhasTarefas');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estrela Guia✯!</Text>
      <FlatList
        data={tarefas}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text>{item}</Text>
            <TouchableOpacity onPress={() => removerTarefa(index)}>
              <Text style={styles.remover}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        
        ListEmptyComponent={
          <Text style={styles.texto}>Nenhuma viagem dos sonhos encontrada. Adicione uma!</Text>
        }
      />
      <TextInput
        style={styles.input}
        placeholder="Digite uma viagem"
        value={tarefa}
        onChangeText={setTarefa}
      />

      <TouchableOpacity style={styles.botao} onPress={adicionarTarefa}>
  <Text style={styles.textoBotao}>Adicionar</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.botao2} onPress={adicionarTarefa}>
  <Text style={styles.textoBotao}>Limpar Tudo</Text>
</TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#8db6bdff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#436e69ff',
    fontFamily: 'courier',
  },
  texto: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'courier',
    color: '#747277ff'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    backgroundColor: '#fff',
    fontFamily: 'courier',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f8fa',
    padding: 12,
    marginBottom: 8,
    borderRadius: 6,
  },
  remover: {
    color: '#578183a1',
    fontWeight: 'bold',
    padding: 4,
  },
  
  botao: {
    backgroundColor: '#b3a8b8ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'courier',
  },

  botao2: {
    backgroundColor: '#5b7d80ff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotao2: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'courier',
  },

});