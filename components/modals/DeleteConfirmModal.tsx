import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface DeleteConfirmModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  itemName: string;
  isSubmitting: boolean;
  styles: any;
}

export const DeleteConfirmModal = ({
  visible,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isSubmitting,
  styles
}: DeleteConfirmModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <MaterialIcons name="warning" size={50} color="#d91717" style={{ marginBottom: 15 }} />
          <Text style={styles.modalTitle}>{title}</Text>
          <Text style={styles.modalText}>
            {message} <Text style={{ fontWeight: 'bold' }}>{itemName}</Text>? Esta acción no se puede deshacer.
          </Text>

          <View style={styles.modalButtons}>
            <TouchableOpacity
              style={[styles.modalButton, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.deleteConfirmButton]}
              onPress={onConfirm}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.submitButtonText}>Eliminar</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
