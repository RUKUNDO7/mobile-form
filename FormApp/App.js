import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Switch,
  Button,
  Pressable,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Slider from '@react-native-community/slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import Checkbox from 'expo-checkbox';
import * as DocumentPicker from 'expo-document-picker';

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
      hobbies,
      file: file
        ? { name: file.name, uri: file.uri, size: file.size, type: file.mimeType }
        : null,
    };
    console.log('Form submitted:', formData);
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>Name</Text>
        <TextInput value={name} onChangeText={setName} placeholder="Enter name" />

        <Text>Email</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
        />

        <Text>Age</Text>
        <TextInput
          value={age}
          onChangeText={setAge}
          placeholder="Enter age"
          keyboardType="numeric"
        />

        <Text>Bio (multiline)</Text>
        <TextInput
          value={bio}
          onChangeText={setBio}
          placeholder="Tell us about yourself"
          multiline
          numberOfLines={4}
        />

        <Text>Gender (radio buttons)</Text>
        {['Male', 'Female', 'Other'].map((option) => (
          <Pressable key={option} onPress={() => setGender(option)}>
            <Text>
              {gender === option ? '(•)' : '( )'} {option}
            </Text>
          </Pressable>
        ))}

        <Text>Country (dropdown)</Text>
        <Picker selectedValue={country} onValueChange={(value) => setCountry(value)}>
          <Picker.Item label="Rwanda" value="Rwanda" />
          <Picker.Item label="Kenya" value="Kenya" />
          <Picker.Item label="Uganda" value="Uganda" />
          <Picker.Item label="Tanzania" value="Tanzania" />
        </Picker>

        <Text>Birth date: {birthDate.toDateString()}</Text>
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

        <Text>Rating: {rating}</Text>
        <Slider
          minimumValue={0}
          maximumValue={10}
          step={1}
          value={rating}
          onValueChange={setRating}
        />

        <Text>Hobbies (checkboxes)</Text>
        {Object.keys(hobbies).map((key) => (
          <View key={key} style={{ flexDirection: 'row' }}>
            <Checkbox value={hobbies[key]} onValueChange={() => toggleHobby(key)} />
            <Text> {key}</Text>
          </View>
        ))}

        <View style={{ flexDirection: 'row' }}>
          <Checkbox value={agreeTerms} onValueChange={setAgreeTerms} />
          <Text> I agree to the terms</Text>
        </View>

        <Text>Subscribe to newsletter (switch)</Text>
        <Switch value={newsletter} onValueChange={setNewsletter} />

        <Text>File upload</Text>
        <Button title="Choose file" onPress={pickFile} />
        <Text>{file ? `Selected: ${file.name}` : 'No file selected'}</Text>

        <Button title="Submit" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
}