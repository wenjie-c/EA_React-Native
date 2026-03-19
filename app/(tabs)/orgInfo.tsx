import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { AddUserToOrgModal } from '../../components/modals/AddUserToOrgModal';
import { DeleteConfirmModal } from '../../components/modals/DeleteConfirmModal';
import { EditOrgNameModal } from '../../components/modals/EditOrgNameModal';
import { organizacionService } from '../../services/organizations';
import { usuarioService } from '../../services/users';
import { usersStyles as styles } from '../../styles/users.styles';

export default function OrgInfoScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams();
  const orgId = typeof id === 'string' ? id : (id?.[0] || '');
  const orgName = typeof name === 'string' ? name : (name?.[0] || 'Organización');

  const [orgUsers, setOrgUsers] = useState<any[]>([]);
  const [availableUsers, setAvailableUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedUserToAdd, setSelectedUserToAdd] = useState('');

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: string, name: string } | null>(null);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentOrgName, setCurrentOrgName] = useState(orgName);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setCurrentOrgName(orgName);
  }, [orgName]);

  const fetchUsers = async (isActive: boolean) => {
    if (!orgId) return;
    setLoading(true);
    try {
      const [usersInOrg, allUsers] = await Promise.all([
        organizacionService.getUsuariosPorOrganizacion(orgId),
        usuarioService.getUsuarios()
      ]);

      if (isActive) {
        setOrgUsers(usersInOrg);

        // Filter out users that are already in the organization
        const usersInOrgIds = new Set(usersInOrg.map((u: any) => u._id));
        const usersNotInOrg = allUsers.filter((u: any) => !usersInOrgIds.has(u._id));
        setAvailableUsers(usersNotInOrg);
      }
    } catch (error) {
      console.error('Error al cargar datos de la organización:', error);
      if (isActive) {
        Alert.alert("Error", "No se pudieron cargar los usuarios de la organización.");
      }
    } finally {
      if (isActive) setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      fetchUsers(isActive);
      return () => {
        isActive = false;
      };
    }, [orgId])
  );

  const handleDeleteUser = (userId: string, userName: string) => {
    setUserToDelete({ id: userId, name: userName });
    setDeleteModalVisible(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete || !orgId) return;

    setIsSubmitting(true);
    try {
      // Remove user from organization by setting their organizacion field to empty
      await usuarioService.updateUsuario(userToDelete.id, { organizacion: null });

      // Instead of manual state updates, fetch the latest list to be safe
      await fetchUsers(true);

      setDeleteModalVisible(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Error al remover usuario de organización:', error);
      Alert.alert("Error", "No se pudo remover el usuario de la organización.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUser = async () => {
    if (!selectedUserToAdd || !orgId) {
      Alert.alert("Error", "Debe seleccionar un usuario");
      return;
    }

    setIsSubmitting(true);
    try {
      // Add user to organization
      await usuarioService.updateUsuario(selectedUserToAdd, { organizacion: orgId });

      await fetchUsers(true);

      setAddModalVisible(false);
      setSelectedUserToAdd('');
    } catch (error) {
      console.error('Error al añadir usuario a la organización:', error);
      Alert.alert("Error", "No se pudo añadir el usuario a la organización");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateName = async (newName: string) => {
    if (!newName.trim() || !orgId) {
      Alert.alert("Error", "El nombre no puede estar vacío");
      return;
    }

    setIsSubmitting(true);
    try {
      await organizacionService.updateOrganizacion(orgId, { name: newName });
      setCurrentOrgName(newName);
      setEditModalVisible(false);
    } catch (error) {
      console.error('Error al actualizar nombre de organización:', error);
      Alert.alert("Error", "No se pudo actualizar el nombre");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 15 }}>
          <MaterialIcons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { marginBottom: 2 }]}>{currentOrgName}</Text>
          <Text style={styles.cardSubtitle}>ID | {orgId}</Text>
        </View>
        <TouchableOpacity onPress={() => setEditModalVisible(true)}>
          <MaterialIcons name="edit" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
      <View style={[styles.separator, { marginTop: 15 }]} />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
      ) : orgUsers.length === 0 ? (
        <Text style={styles.subtitle}>No hay usuarios en esta organización.</Text>
      ) : (
        <FlatList
          data={orgUsers}
          keyExtractor={(item) => item._id?.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.email}</Text>
              </View>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteUser(item._id, item.name)}
              >
                <MaterialIcons name="close" size={20} color="#8b0000" />
              </TouchableOpacity>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => setAddModalVisible(true)}
      >
        <MaterialIcons name="person-add" size={28} color="#fff" />
      </TouchableOpacity>

      <AddUserToOrgModal
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onSave={handleAddUser}
        selectedUser={selectedUserToAdd}
        setSelectedUser={setSelectedUserToAdd}
        availableUsers={availableUsers}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteUser}
        title="¿Remover Usuario?"
        message="¿Estás seguro de que deseas remover de la organización al usuario"
        itemName={userToDelete?.name || ''}
        isSubmitting={isSubmitting}
        styles={styles}
      />

      <EditOrgNameModal
        visible={editModalVisible}
        onClose={() => setEditModalVisible(false)}
        onSave={handleUpdateName}
        initialName={currentOrgName}
        isSubmitting={isSubmitting}
      />
    </View>
  );
}
