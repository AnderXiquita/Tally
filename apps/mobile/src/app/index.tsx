import { StyleSheet, Text, View } from 'react-native';

// Pantalla provisional. Se reemplaza al crear los tokens y las primitivas (pasos 5 y 6).
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tally</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#EDEDED',
    fontSize: 24,
  },
});
