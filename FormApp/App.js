import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Pressable,
  StyleSheet,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ColorPicker, { Panel1, HueSlider, Preview } from 'reanimated-color-picker';

export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [bio, setBio] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('Rwanda');
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [rating, setRating] = useState(5);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [hobbies, setHobbies] = useState({ coding: false, music: false, sports: false });

  const [file, setFile] = useState(null);
  const [color, setColor] = useState('#3B82F6');

  const toggleHobby = (key) => setHobbies({ ...hobbies, [key]: !hobbies[key] });

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const handleSubmit = () => {
    const formData = {
      name,
      email,
      password,
      age,
      bio,
      gender,
      country,
      birthDate: birthDate.toDateString(),
      rating,
      agreeTerms,
      newsletter,
      color,
      hobbies,
      file: file
        ? { name: file.name, uri: file.uri, size: file.size, type: file.mimeType }
        : null,
    };
    console.log('Form submitted:', formData);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter name"
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter email"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter password"
            secureTextEntry
          />

          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Enter age"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Bio (multiline)</Text>
          <TextInput
            style={[styles.input, styles.multiline]}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Gender (radio buttons)</Text>
          {['Male', 'Female', 'Other'].map((option) => (
            <Pressable key={option} style={styles.row} onPress={() => setGender(option)}>
              <Text style={styles.text}>
                {gender === option ? '(•)' : '( )'} {option}
              </Text>
            </Pressable>
          ))}

          <Text style={styles.label}>Country (dropdown)</Text>
          <View style={styles.pickerBox}>
            <Picker selectedValue={country} onValueChange={(value) => setCountry(value)}>
              <Picker.Item label="Rwanda" value="Rwanda" />
              <Picker.Item label="Kenya" value="Kenya" />
              <Picker.Item label="Uganda" value="Uganda" />
              <Picker.Item label="Tanzania" value="Tanzania" />
            </Picker>
          </View>

          <Text style={styles.label}>Birth date: {birthDate.toDateString()}</Text>
          <Button title="Pick date" onPress={() => setShowDate(true)} />
          {showDate && (
            <DateTimePicker
              value={birthDate}
              mode="date"
              onChange={(event, selected) => {
                setShowDate(false);
                if (selected) setBirthDate(selected);
              }}
            />
          )}

          <Text style={styles.label}>Rating: {rating}</Text>
          <Slider
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={rating}
            onValueChange={setRating}
          />

          <Text style={styles.label}>Hobbies (checkboxes)</Text>
          {Object.keys(hobbies).map((key) => (
            <View key={key} style={styles.row}>
              <Checkbox value={hobbies[key]} onValueChange={() => toggleHobby(key)} />
              <Text style={styles.checkboxText}>{key}</Text>
            </View>
          ))}

          <View style={styles.row}>
            <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
            <Text style={styles.checkboxText}>I agree to the terms</Text>
          </View>

          <Text style={styles.label}>Subscribe to newsletter (switch)</Text>
          <Switch value={newsletter} onValueChange={setNewsletter} />

          <Text style={styles.label}>Favorite color (color picker)</Text>
          <ColorPicker
            style={styles.colorPicker}
            value={color}
            onCompleteJS={({ hex }) => setColor(hex)}
          >
            <Preview hideInitialColor />
            <Panel1 style={styles.colorPanel} />
            <HueSlider style={styles.hueSlider} />
          </ColorPicker>
          <View style={styles.row}>
            <View style={[styles.preview, { backgroundColor: color }]} />
            <Text style={styles.checkboxText}>Selected: {color}</Text>
          </View>

          <Text style={styles.label}>File upload</Text>
          <Button title="Choose file" onPress={pickFile} />
          <Text style={styles.text}>
            {file ? `Selected: ${file.name}` : 'No file selected'}
          </Text>

          <View style={styles.submit}>
            <Button title="Submit" onPress={handleSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 6,
  },
  text: {
    fontSize: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  multiline: {
    minHeight: 90,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 15,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  colorPicker: {
    width: '100%',
    gap: 14,
    marginBottom: 12,
  },
  colorPanel: {
    height: 200,
    borderRadius: 12,
  },
  hueSlider: {
    borderRadius: 12,
  },
  preview: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submit: {
    marginTop: 28,
  },
});