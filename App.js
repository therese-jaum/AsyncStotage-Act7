import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomForm from './Src/CustomForm'; 
import CustomTable from './Src/CustomTable'; 
import CustomModal from './Src/CustomModal'; 

const CustomApp = () => { 
  const [dataList, setDataList] = useState([]); 
  const [showDataList, setShowDataList] = useState(false); 
  const [selectedDataIndex, setSelectedDataIndex] = useState(null); 
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const addData = (data) => { 
    setDataList([...dataList, data]); 
    saveData([...dataList, data]);
    setMessage('ADDED!');
  };

  const saveData = async (data) => {
    try {
      await AsyncStorage.setItem('dataList', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem('dataList');
      if (data !== null) {
        setDataList(JSON.parse(data));
      }
    } catch (error) {
      console.error('ERROR:', error);
    }
  };

  const onViewData = (index) => { 
    setSelectedDataIndex(index);
  };

  const closeModal = () => {
    setSelectedDataIndex(null);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {selectedDataIndex !== null && (
          <CustomModal 
            isVisible={selectedDataIndex !== null}
            data={dataList[selectedDataIndex]} 
            onClose={closeModal}
          />
        )}
        {showDataList ? (
          <CustomTable 
            dataList={dataList} 
            onViewData={onViewData} 
          />
        ) : (
          <CustomForm 
            onAddData={addData} 
          />
        )}
      </ScrollView>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={() => setShowDataList(!showDataList)}
      >
        <Text style={styles.buttonText}>
          {showDataList ? '     ADD DATA    ' : '          VIEW DATA LIST       '}
        </Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    backgroundColor: '#6600cc',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    marginBottom: 110,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
  },
  message: {
    position: 'absolute',
    bottom: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    padding: 10,
    borderRadius: 3,
  },
});

export default CustomApp;
