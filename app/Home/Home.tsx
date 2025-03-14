import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, Image, TouchableOpacity, Alert, StatusBar } from 'react-native';
import { Table, Row, TableWrapper, Cell } from 'react-native-table-component';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Home() {
    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState<string[]>([]);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    function addTask(): void {
        if (task.trim().length > 0) {
            setTasks([...tasks, task]);
            setTask('');
        }
    }

    function cancelTask(): void {
        setTask('');
        setEditIndex(null);
    }

    function deleteTask(index: number): void {
        const newTasks = [...tasks];
        newTasks.splice(index, 1);
        setTasks(newTasks);
    }

    function editTask(index: number): void {
        setEditIndex(index);
        setTask(tasks[index]);
    }

    function saveTask(): void {
        if (editIndex !== null && task.trim().length > 0) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = task;
            setTasks(updatedTasks);
            setEditIndex(null);
            setTask('');
        } else {
            addTask();
        }
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.header}>
                        <Text style={styles.title}>To-Do List</Text>
                    </View>

                    <View style={styles.overlay}>
                        <View style={styles.imageContainer}>
                            <Image
                                source={{ uri: "https://img.freepik.com/free-vector/modern-devices-isometric-composition-with-view-modern-workspace-with-big-table-consumer-electronics-computers-illustration_1284-29119.jpg" }}
                                style={styles.image}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Add a new task..."
                                onChangeText={setTask}
                                value={task}
                            />

                            <View style={styles.buttonRow}>
                                <TouchableOpacity style={styles.button} onPress={saveTask} activeOpacity={0.8}>
                                    <Icon name={editIndex !== null ? "save" : "add"} size={24} color="white" />
                                    <Text style={styles.buttonText}>{editIndex !== null ? 'Save' : 'Submit'}</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.button} onPress={cancelTask} activeOpacity={0.8}>
                                    <Icon name="cancel" size={24} color="white" />
                                    <Text style={styles.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.separator} />

                            <View style={styles.taskList}>
                                <Table borderStyle={{ borderWidth: 2, borderColor: 'transparent' }}>
                                    <Row data={['Task', 'Delete', 'Edit']} style={styles.head} textStyle={styles.text} />
                                    {
                                        tasks.map((task, index) => (
                                            <TableWrapper key={index} style={styles.row}>
                                                <Cell data={task} textStyle={styles.text} />
                                                <Cell data={
                                                    <TouchableOpacity style={styles.btn} onPress={() => deleteTask(index)}>
                                                      <Text style={styles.btnText}>
                                                      <Icon name="delete" size={24} color="white" />
                                                        Delete
                                                      </Text>

                                                    </TouchableOpacity>
                                                } />
                                                <Cell data={
                                                    <TouchableOpacity style={styles.btn} onPress={() => editTask(index)}>
                                                    <Text style={styles.btnText}>
                                                    <Icon name="edit" size={24} color="white" />
                                                        Edit
                                                    </Text>
                                                    </TouchableOpacity>
                                                } />
                                            </TableWrapper>
                                        ))
                                    }
                                </Table>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#85BCAD',
        width: '100%',
        paddingTop: StatusBar.currentHeight,
    },
    overlay: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        flex: 1,
        width: '100%',
        flexDirection: 'row-reverse',
    },
    imageContainer: {
        flex: 1,
        alignItems: 'center',
        margin: 10,
    },
    image: {
        width: 900,
        height: 700,
        resizeMode: 'contain',
    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    input: {
        width: 500,
        height: 50,
        borderColor: '#85BCAD',
        borderWidth: 1,
        padding: 10,
        marginBottom: 10,
        backgroundColor: '#E0F2F1',
        borderRadius: 10,
        fontSize: 18,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        margin: 5,
    },
    buttonText: {
        fontSize: 16,
        color: 'white',
        marginLeft: 5,
    },
    separator: {
        height: 1,
        backgroundColor: 'gray',
        width: '80%',
        margin: 10,
    },
    taskList: {
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    head: {
        backgroundColor: '#4CAF50',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: 400,
        borderRadius: 10,
    },
    row: {
        flexDirection: 'row',
        backgroundColor: '#E8F5E9',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#85BCAD',
        borderRadius: 10,
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
    },
    btn: {
        padding: 5,
        backgroundColor: 'green',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
    },
    header: {
        width: '100%',
        backgroundColor: '#85BCAD',
        alignItems: 'center',
        padding: 10,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
    },
    btnText : {
        fontSize: 20,
        color: 'white',
    },
});
