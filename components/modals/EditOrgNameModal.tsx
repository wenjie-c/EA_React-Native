import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { organizationStyles as styles } from '../../styles/organization.styles';

interface EditOrgNameModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: (newName: string) => void;
    initialName: string;
    isSubmitting: boolean;
}

export const EditOrgNameModal = ({
    visible,
    onClose,
    onSave,
    initialName,
    isSubmitting
}: EditOrgNameModalProps) => {
    const [tempName, setTempName] = useState(initialName);

    // Update internal state when standard initialName changes (like on first open)
    useEffect(() => {
        if (visible) {
            setTempName(initialName);
        }
    }, [visible, initialName]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Editar Nombre</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la organización"
                        value={tempName}
                        onChangeText={setTempName}
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
                            onPress={() => onSave(tempName)}
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
