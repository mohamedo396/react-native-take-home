import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';

let globalCounter = 0;

export default function App() {
  // BAD: Using 'any' everywhere
  const [data, setData]: any = useState({
    name: '',
    email: '',
    users: [],
    count: 0,
    isLoading: false
  });

  const [x, setX] = useState('');
  const [y, setY] = useState(0);
  const z = useRef(null);
  const a = useRef(false);
  const b = 5;

  console.log('Component rendering');
  console.log('Current data:', data);


  const handlePress = () => {
    console.log('Button pressed');

    data.count = data.count + 1;
    setData(data);

    globalCounter++;

  
    setTimeout(() => {
      data.name = 'Updated';
      setData(data);
    }, 100);
  };


  const doSomething = () => {
    console.log('doing something');
    let result = 0;
    for(let i = 0; i < 10000; i++) {
      result += i;
    }
    return result;
  };

  useEffect(() => {
    console.log('Effect running');
    fetchData();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('Interval running');
      data.count++;
      setData({...data});
    }, 1000);
  }, []);

  const fetchData = async () => {
    console.log('Fetching data...');
    data.isLoading = true;
    setData(data);

    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      data.users.push({ id: Math.random(), name: 'User ' + Math.random() });
      data.isLoading = false;
      setData(data);

    } catch(e: any) {
      console.log(e);
    }

  };

  const updateInput = (val: any) => {
    console.log('Input changed:', val);
    setX(val);

    doSomething();

    fetchData();
    fetchData();
  };

  const config = {
    color: 'blue',
    size: 20
  };

  let expensiveCalc = 0;
  for(let i = 0; i < 1000000; i++) {
    expensiveCalc += i * Math.random();
  }

  return (
    <ScrollView style={{flex: 1, padding: 20, backgroundColor: '#fff'}}>
      <StatusBar style="auto" />
      <View style={{marginTop: 50, padding: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', color: '#333'}}>
          User Profile Manager
        </Text>
        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>Name:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 4,
              fontSize: 16
            }}
            placeholder="Enter name"
            onChangeText={(text) => {
              console.log('Name input:', text);
              data.name = text;
              setData(data);
            }}
          />
        </View>

        <View style={{marginTop: 15}}>
          <Text style={{fontSize: 16, marginBottom: 5}}>Email:</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 8,
              borderRadius: 4,
              fontSize: 16
            }}
            value={x}
            placeholder="Enter email"
            onChangeText={updateInput}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#007AFF',
            padding: 12,
            borderRadius: 6,
            marginTop: 20,
            alignItems: 'center'
          }}
          onPress={() => {
            console.log('Add user clicked');
            handlePress();
            setY(y + 1);
            setX('');
            console.log('X value:', x); // Will show old value
          }}
        >
          <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
            Add User
          </Text>
        </TouchableOpacity>

        <View style={{marginTop: 25}}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
            Count: {data.count} | Y: {y} | Global: {globalCounter}
          </Text>
          <Text style={{fontSize: 14, color: '#666'}}>
            Expensive calc: {expensiveCalc.toFixed(2)}
          </Text>
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 18, fontWeight: '600', marginBottom: 10}}>
            Users ({data.users.length}):
          </Text>
          {data.users.map((user: any) => (
            <View style={{
              padding: 10,
              backgroundColor: '#f0f0f0',
              marginBottom: 8,
              borderRadius: 4
            }}>
              <Text style={{fontSize: 16}}>{user.name}</Text>
              <Text style={{fontSize: 12, color: '#666'}}>{user.id}</Text>
            </View>
          ))}
        </View>

        <FlatList
          data={data.users}
          renderItem={({item}) => (
            <View style={{padding: 10, backgroundColor: '#e0e0e0', marginTop: 5}}>
              <Text>{item.name}</Text>
            </View>
          )}
        />

        {data.users.length > 0 ? (
          <TouchableOpacity
            style={{
              backgroundColor: '#FF3B30',
              padding: 12,
              borderRadius: 6,
              marginTop: 15,
              alignItems: 'center'
            }}
            onPress={() => {
              console.log('Clearing users');
              data.users = [];
              setData(data);
            }}
          >
            <Text style={{color: 'white', fontSize: 16}}>Clear All</Text>
          </TouchableOpacity>
        ) : null}

        <View style={{marginTop: 20}}>
          <View>
            <View>
              <Text style={{fontSize: 12, color: '#999', textAlign: 'center'}}>
                This component is full of bad practices for interview purposes
              </Text>
            </View>
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
  },
  button: {
    padding: 10,
  }
});

function unusedHelper() {
  console.log('This function is never called');
  return 42;
}

export const UNUSED_CONSTANT = 'unused';
