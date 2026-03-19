import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { organizationStyles as styles } from '../../styles/organization.styles';

interface CreateOrgModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  name: string;
  setName: (val: string) => void;
  isSubmitting: boolean;
}

export const CreateOrgModal = ({
  visible,
  onClose,
  onSave,
  name,
  setName,
  isSubmitting
}: CreateOrgModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nueva Organización</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre de la organización"
            value={name}
            onChangeText={setName}
          />

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
