import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { usersStyles as styles } from '../../styles/users.styles';

interface UserInfoModalProps {
  visible: boolean;
  onClose: () => void;
  user: any;
  organizations: any[];
  onSave: (updatedUser: any) => Promise<void>;
  isSubmitting: boolean;
}

export const UserInfoModal = ({
  visible,
  onClose,
  user,
  organizations,
  onSave,
  isSubmitting
}: UserInfoModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editOrg, setEditOrg] = useState('');

  // Reset states when modal is opened or user changes
  useEffect(() => {
    if (visible && user) {
      setIsEditing(false);
      setEditName(user.name || '');
      setEditEmail(user.email || '');
      
      const currentOrgId = typeof user.organizacion === 'object' && user.organizacion !== null
        ? user.organizacion._id
        : user.organizacion || '';
      
      setEditOrg(currentOrgId);
    }
  }, [visible, user]);

  const handleClose = () => {
    setIsEditing(false);
    onClose();
  };

  const handleSave = async () => {
    await onSave({
      name: editName,
      email: editEmail,
      organizacion: editOrg || null
    });
    // Let the parent component close or change state, but we can turn off edit mode if it didn't throw
    setIsEditing(false);
  };

  if (!user) return null;

  const orgName = typeof user.organizacion === 'object' && user.organizacion !== null
    ? user.organizacion.name 
    : organizations.find(o => o._id === user.organizacion)?.name || 'Ninguna';

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Información del Usuario</Text>

          {isEditing ? (
            <>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder="Nombre completo"
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={editEmail}
                onChangeText={setEditEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Correo electrónico"
              />

              <Text style={styles.label}>Organización</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={editOrg}
                  onValueChange={(itemValue) => setEditOrg(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Ninguna" value="" color="#999" />
                  {organizations.map((org) => (
                    <Picker.Item key={org._id} label={org.name} value={org._id} />
                  ))}
                </Picker>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={() => setIsEditing(false)}
                  disabled={isSubmitting}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={handleSave}
                  disabled={isSubmitting || !editName.trim() || !editEmail.trim()}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Guardar</Text>
                  )}
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <View style={{ width: '100%', marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold', color: '#666', marginBottom: 5 }}>Nombre</Text>
                <Text style={{ fontSize: 16, color: '#333' }}>{user.name}</Text>
              </View>

              <View style={{ width: '100%', marginBottom: 15 }}>
                <Text style={{ fontWeight: 'bold', color: '#666', marginBottom: 5 }}>Email</Text>
                <Text style={{ fontSize: 16, color: '#333' }}>{user.email}</Text>
              </View>

              <View style={{ width: '100%', marginBottom: 25 }}>
                <Text style={{ fontWeight: 'bold', color: '#666', marginBottom: 5 }}>Organización</Text>
                <Text style={{ fontSize: 16, color: '#333' }}>{orgName}</Text>
              </View>

              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton, { borderWidth: 1.5, borderColor: '#999' }]}
                  onPress={handleClose}
                >
                  <Text style={styles.cancelButtonText}>Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.submitButton]}
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.submitButtonText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
};
