import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://polar-wildwood-72630-ed5f60f11d8e.herokuapp.com/getData');
      const result = await response.json();
      // Set the data to state
      setData(result);
  
      // Get the last object
      const lastObject = result.arduinoData[result.arduinoData.length - 1];
  
      // Log the last object
      console.log('Last Object:', lastObject);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []);

  const renderPairs = () => {
    const lastObject = data.arduinoData[data.arduinoData.length - 1];
    const pairs = Object.entries(lastObject);

    return pairs.reduce((rows, pair, index) => {
      if (index % 2 === 0) {
        rows.push([]);
      }
      rows[rows.length - 1].push(pair);
      return rows;
    }, []);
  };

  return (
    <View style={styles.container}>
      {data && (
        <View style={styles.boxContainer}>
          {renderPairs().map((row, rowIndex) => (
            <View key={rowIndex} style={styles.rowContainer}>
              {row.map(([key, value]) => (
                <View key={key} style={styles.box}>
                  <Text style={styles.label}>{key}:</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background
  },
  boxContainer: {
    flexDirection: 'column',
    alignItems: 'stretch', // Align items along the cross-axis (stretch to full width)
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  box: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'green',
    borderRadius: 10, // Rounded corners
    padding: 15,
    margin: 10,
    width: '45%', // Cover the whole width
    backgroundColor: 'white', // White background
    elevation: 5, // Shadow on Android
    shadowColor: 'black', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 5, // Shadow radius
  },
  label: {
    fontWeight: 'bold',
    padding: 8,
    fontSize: 16,
    color: 'green', // Green label color
  },
  value: {
    fontSize: 16,
    fontWeight: '700',
    color: 'blue', // Blue value color
  },
});



export default App;
