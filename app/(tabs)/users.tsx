import { MaterialIcons } from "@expo/vector-icons";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { CreateUserModal } from "../../components/modals/CreateUserModal";
import { DeleteConfirmModal } from "../../components/modals/DeleteConfirmModal";
import { UserInfoModal } from "../../components/modals/UserInfoModal";
import { organizacionService } from "../../services/organizations";
import { usuarioService } from "../../services/users";
import { usersStyles as styles } from "../../styles/users.styles";

export default function UsersScreen() {
  // No utiliza useForm ?
  const [users, setUsers] = useState<any[]>([]);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [selectedOrg, setSelectedOrg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;
      const fetchData = async () => {
        setLoading(true);
        try {
          const [usersData, orgsData] = await Promise.all([
            usuarioService.getUsuarios(),
            organizacionService.getOrganizaciones(),
          ]);
          if (isActive) {
            setUsers(usersData);
            setOrganizations(orgsData);
          }
        } catch (error) {
          console.error("Error al cargar datos:", error);
        } finally {
          if (isActive) setLoading(false);
        }
      };

      fetchData();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const handleDeleteUser = (id: string, name: string) => {
    setUserToDelete({ id, name });
    setDeleteModalVisible(true);
  };

  const handleViewUser = (user: any) => {
    setSelectedUser(user);
    setInfoModalVisible(true);
  };

  const confirmDeleteUser = async () => {
    if (!userToDelete) return;

    setIsSubmitting(true);
    try {
      await usuarioService.deleteUsuario(userToDelete.id);
      setUsers(users.filter((user) => user._id !== userToDelete.id));
      setDeleteModalVisible(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      Alert.alert("Error", "No se pudo eliminar el usuario.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddUser = async () => {
    if (!newName.trim() || !newEmail.trim() || !newPassword.trim()) {
      Alert.alert("Error", "Nombre, Email y Contraseña son obligatorios");
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await usuarioService.createUsuario({
        name: newName,
        email: newEmail,
        password: newPassword,
        organizacion: selectedOrg || undefined,
      });
      setUsers([...users, newUser]);
      setModalVisible(false);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
      setSelectedOrg("");
    } catch (error) {
      console.error("Error al añadir usuario:", error);
      Alert.alert("Error", "No se pudo añadir el usuario");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateUser = async (updatedData: any) => {
    if (!selectedUser) return;

    setIsSubmitting(true);
    try {
      const updatedUser = await usuarioService.updateUsuario(
        selectedUser._id,
        updatedData,
      );
      setUsers(
        users.map((u) => (u._id === selectedUser._id ? updatedUser : u)),
      );
      setSelectedUser(updatedUser); // Update the local selected user in case they open the edit menu again immediately
      Alert.alert("Éxito", "Usuario actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      Alert.alert("Error", "No se pudo actualizar el usuario");
      throw error; // Throw error to prevent the modal from closing edit mode if it failed
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    const userNameMatch = user.name.toLowerCase().includes(searchLower);

    return userNameMatch;
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>

      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.separator} />

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : filteredUsers.length === 0 ? (
        <Text style={styles.subtitle}>
          {searchQuery
            ? "No se encontraron usuarios."
            : "No hay usuarios registrados."}
        </Text>
      ) : (
        <FlatList
          data={filteredUsers}
          keyExtractor={(item) => item._id?.toString()}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => handleViewUser(item)}
              >
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardSubtitle}>{item.email}</Text>
              </TouchableOpacity>
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
        onPress={() => setModalVisible(true)}
      >
        <MaterialIcons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      <CreateUserModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={handleAddUser}
        name={newName}
        setName={setNewName}
        email={newEmail}
        setEmail={setNewEmail}
        password={newPassword}
        setPassword={setNewPassword}
        selectedOrg={selectedOrg}
        setSelectedOrg={setSelectedOrg}
        organizations={organizations}
        isSubmitting={isSubmitting}
      />

      <DeleteConfirmModal
        visible={deleteModalVisible}
        onClose={() => setDeleteModalVisible(false)}
        onConfirm={confirmDeleteUser}
        title="¿Eliminar Usuario?"
        message="¿Estás seguro de que deseas eliminar al usuario"
        itemName={userToDelete?.name || ""}
        isSubmitting={isSubmitting}
        styles={styles}
      />

      <UserInfoModal
        visible={infoModalVisible}
        onClose={() => setInfoModalVisible(false)}
        user={selectedUser}
        organizations={organizations}
        onSave={handleUpdateUser}
        isSubmitting={isSubmitting}
      />
    </View>
  );
}
