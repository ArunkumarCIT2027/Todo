import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Keyboard } from 'react-native';
import Task from './components/Task';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [task, setTask] = useState('');
  const [taskItems, setTaskItems] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  };

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) {
        setTaskItems(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks', error);
    }
  };

  const handleAddTask = () => {
    Keyboard.dismiss();
    const updatedTasks = [...taskItems, task];
    setTaskItems(updatedTasks);
    setTask('');
    saveTasks(updatedTasks);
  };

  const completeTask = (index) => {
    const updatedTasks = [...taskItems];
    updatedTasks.splice(index, 1);
    setTaskItems(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <View style={styles.container}>
      {/* Today's tasks */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* tasks */}
          {taskItems.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Writing a task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.input}
          placeholder={'Write a Task'}
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addText: {},
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
    borderRadius: 60,
  },
});
