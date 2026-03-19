import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usersStyles as styles } from '../../styles/users.styles';

interface CreateUserModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  password: string;
  setPassword: (val: string) => void;
  selectedOrg: string;
  setSelectedOrg: (val: string) => void;
  organizations: any[];
  isSubmitting: boolean;
}

export const CreateUserModal = ({
  visible,
  onClose,
  onSave,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  selectedOrg,
  setSelectedOrg,
  organizations,
  isSubmitting
}: CreateUserModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nuevo Usuario</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Text style={styles.label}>Organización</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedOrg}
              onValueChange={(itemValue) => setSelectedOrg(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Ninguna" value="" />
              {organizations.map((org) => (
                <Picker.Item key={org._id} label={org.name} value={org._id} />
              ))}
            </Picker>
          </View>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.submitButton]}
              onPress={onSave}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Guardar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
