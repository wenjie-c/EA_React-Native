import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usersStyles as styles } from '../../styles/users.styles';

interface AddUserToOrgModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  selectedUser: string;
  setSelectedUser: (val: string) => void;
  availableUsers: any[];
  isSubmitting: boolean;
}

export const AddUserToOrgModal = ({
  visible,
  onClose,
  onSave,
  selectedUser,
  setSelectedUser,
  availableUsers,
  isSubmitting
}: AddUserToOrgModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Añadir Usuario a Organización</Text>

          <Text style={styles.label}>Seleccionar Usuario</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedUser}
              onValueChange={(itemValue) => setSelectedUser(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Seleccionar uno..." value="" color="#999" />
              {availableUsers.map((user) => (
                <Picker.Item key={user._id} label={user.name + " (" + user.email + ")"} value={user._id} />
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
              disabled={isSubmitting || !selectedUser}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Añadir</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
