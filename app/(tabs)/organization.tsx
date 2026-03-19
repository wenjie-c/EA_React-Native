import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { CreateOrgModal } from '../../components/modals/CreateOrgModal';
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal';
import { organizacionService } from '../../services/organizations';
import { organizationStyles as styles } from '../../styles/organization.styles';

export default function OrganizationScreen() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newOrgName, setNewOrgName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<{ id: string, name: string } | null>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchOrganizations = async () => {
        setLoading(true);
        try {
          const data = await organizacionService.getOrganizaciones();
          if (isActive) setOrganizations(data);
        } catch (error) {
          console.error('Error al cargar organizaciones:', error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchOrganizations();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const handleDeleteOrganization = (id: string, name: string) => {
    setOrgToDelete({ id, name });
    setDeleteModalVisible(true);
  };

  const confirmDeleteOrganization = async () => {
    if (!orgToDelete) return;

    setIsSubmitting(true);
    try {
      await organizacionService.deleteOrganizacion(orgToDelete.id);
      setOrganizations(organizations.filter(org => org._id !== orgToDelete.id));
      setDeleteModalVisible(false);
      setOrgToDelete(null);
    } catch (error) {
      console.error('Error al eliminar organización:', error);
      Alert.alert("Error", "No se pudo eliminar la organización.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOrganization = async () => {
    if (!newOrgName.trim()) {
      Alert.alert("Error", "El nombre de la organización es obligatorio");
      return;
    }

    setIsSubmitting(true);
    try {
      const newOrg = await organizacionService.createOrganizacion({
        name: newOrgName
      });
      setOrganizations([...organizations, newOrg]);
      setModalVisible(false);
      setNewOrgName('');
    } catch (error) {
      console.error('Error al añadir organización:', error);
      Alert.alert("Error", "No se pudo añadir la organización");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Organizaciones</Text>
      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : organizations.length === 0 ? (
        <Text style={styles.subtitle}>No hay organizaciones registradas.</Text>
      ) : (
        <FlatList
          data={organizations}
          keyExtractor={(item) => item._id?.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>
                  ID | {item._id}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteOrganization(item._id, item.name)}
              >
                <MaterialIcons name="close" size={20} color="#8b0000" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <CreateOrgModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddOrganization}
        name={newOrgName}
        setName={setNewOrgName}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteOrganization}
        title="¿Eliminar Organización?"
        message="¿Estás seguro de que deseas eliminar la organización"
        itemName={orgToDelete?.name || ''}
        isSubmitting={isSubmitting}
        styles={styles}
      />
    </View>
  );
}
