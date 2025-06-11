import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useStorageContext } from '../contexts/StorageContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, Button, Input, Modal } from '../components/ui';

const PerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ProfileCard = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const ProfileName = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const ProfileEmail = styled.p`
  color: ${props => props.theme.colors.text.secondary};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const StatCard = styled.div`
  text-align: center;
  padding: ${props => props.theme.spacing.md};
  background-color: ${props => props.theme.colors.background.secondary};
  border-radius: ${props => props.theme.borderRadius.md};
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.xs};
`;

const StatLabel = styled.div`
  color: ${props => props.theme.colors.text.secondary};
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  justify-content: flex-end;
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  margin-top: ${props => props.theme.spacing.sm};
`;

const Perfil = () => {
  const { data } = useStorageContext();
  const navigate = useNavigate();
  const { logout, deleteAccount } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!data || !data.user || !data.workouts) {
    return <div>Carregando...</div>;
  }

  const handleDeleteAccount = () => {
    if (password === data.user.password) {
      deleteAccount();
    } else {
      setError('Senha incorreta');
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleOpenDeleteModal = () => {
    setShowDeleteModal(true);
    setPassword('');
    setError('');
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setPassword('');
    setError('');
  };

  return (
    <PerfilContainer>
      <Title>Meu Perfil</Title>
      
      <ProfileCard>
        <ProfileHeader>
          <ProfileInfo>
            <ProfileName>{data.user.name}</ProfileName>
            <ProfileEmail>{data.user.email}</ProfileEmail>
          </ProfileInfo>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button onClick={() => navigate('/app/editar-perfil')}>
              Editar Perfil
            </Button>
          </div>
        </ProfileHeader>

        <StatsGrid>
          <StatCard>
            <StatValue>{data.user.height}cm</StatValue>
            <StatLabel>Altura</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{data.user.weight}kg</StatValue>
            <StatLabel>Peso</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{data.user.age} anos</StatValue>
            <StatLabel>Idade</StatLabel>
          </StatCard>
        </StatsGrid>
      </ProfileCard>

      <ActionButtons>
        <Button variant="outline" onClick={() => setShowLogoutModal(true)}>
          Sair
        </Button>
        <Button variant="danger" onClick={handleOpenDeleteModal}>
          Excluir Conta
        </Button>
      </ActionButtons>

      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Confirmar Saída"
        footer={
          <>
            <Button variant="outline" onClick={() => setShowLogoutModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleLogout}>
              Confirmar
            </Button>
          </>
        }
      >
        Tem certeza que deseja sair da sua conta?
      </Modal>

      <Modal
        isOpen={showDeleteModal}
        onClose={handleCloseDeleteModal}
        title="Excluir Conta"
        footer={
          <>
            <Button variant="outline" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Excluir
            </Button>
          </>
        }
      >
        <p>Para confirmar a exclusão da sua conta, digite sua senha:</p>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Digite sua senha"
          fullWidth
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Modal>
    </PerfilContainer>
  );
};

export default Perfil; 