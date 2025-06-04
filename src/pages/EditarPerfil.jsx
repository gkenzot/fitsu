import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Input, Button, Card } from '../components/ui';
import { useStorageContext } from '../contexts/StorageContext';

const EditarPerfilContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
  max-width: 600px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.lg};
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const Section = styled(Card)`
  padding: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${props => props.theme.colors.text.primary};
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.fontSizes.xl};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.lg};
`;

const ErrorMessage = styled.p`
  color: ${props => props.theme.colors.error};
  font-size: ${props => props.theme.fontSizes.sm};
  text-align: center;
  margin-top: ${props => props.theme.spacing.sm};
`;

const EditarPerfil = () => {
  const { data, updateData } = useStorageContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: data?.user?.name || '',
    email: data?.user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (formData.newPassword) {
      if (formData.newPassword.length < 6) {
        newErrors.newPassword = 'A senha deve ter pelo menos 6 caracteres';
      }
      if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'As senhas não coincidem';
      }
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Senha atual é obrigatória para alterar a senha';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Verificar senha atual se estiver alterando a senha
      if (formData.newPassword && formData.currentPassword !== data.user.password) {
        setErrors(prev => ({
          ...prev,
          currentPassword: 'Senha atual incorreta'
        }));
        return;
      }

      // Atualizar dados do usuário
      const updatedUser = {
        ...data.user,
        name: formData.name,
        email: formData.email
      };

      if (formData.newPassword) {
        updatedUser.password = formData.newPassword;
      }

      updateData({
        user: updatedUser
      });

      navigate('/app/perfil');
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      setErrors(prev => ({
        ...prev,
        form: 'Ocorreu um erro ao atualizar o perfil'
      }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <EditarPerfilContainer>
      <Title>Editar Perfil</Title>

      <Form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>Informações Pessoais</SectionTitle>
          <Input
            label="Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            fullWidth
          />
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
            fullWidth
          />
        </Section>

        <Section>
          <SectionTitle>Alterar Senha</SectionTitle>
          <Input
            label="Senha Atual"
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            error={errors.currentPassword}
            fullWidth
          />
          <Input
            label="Nova Senha"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            error={errors.newPassword}
            fullWidth
          />
          <Input
            label="Confirmar Nova Senha"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            fullWidth
          />
        </Section>

        {errors.form && (
          <ErrorMessage>{errors.form}</ErrorMessage>
        )}

        <ButtonGroup>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/app/perfil')}
            fullWidth
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            fullWidth
          >
            {isLoading ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </ButtonGroup>
      </Form>
    </EditarPerfilContainer>
  );
};

export default EditarPerfil; 