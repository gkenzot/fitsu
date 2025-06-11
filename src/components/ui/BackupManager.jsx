import React, { useState } from 'react';
import styled from 'styled-components';
import { Button } from './';
import { exportData, importData } from '../../utils/backupUtils';
import { useStorageContext } from '../../contexts/StorageContext';

const BackupContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
  padding: ${props => props.theme.spacing.lg};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
`;

const FileInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  margin-top: ${props => props.theme.spacing.sm};
`;

const SuccessMessage = styled.div`
  color: ${props => props.theme.colors.success};
  margin-top: ${props => props.theme.spacing.sm};
`;

const BackupManager = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { updateData } = useStorageContext();

  const handleExport = () => {
    try {
      exportData();
      setSuccess('Backup exportado com sucesso!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const data = await importData(file);
      updateData(data);
      setSuccess('Dados importados com sucesso!');
      setError(null);
    } catch (error) {
      setError(error.message);
      setSuccess(null);
    }

    // Limpa o input para permitir importar o mesmo arquivo novamente
    event.target.value = '';
  };

  return (
    <BackupContainer>
      <h2>Backup e Restauração</h2>
      
      <ButtonGroup>
        <Button onClick={handleExport}>
          Exportar Backup
        </Button>
        
        <FileInput
          type="file"
          accept=".json"
          onChange={handleImport}
          id="import-file"
        />
        <Button
          as="label"
          htmlFor="import-file"
        >
          Importar Backup
        </Button>
      </ButtonGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}
      {success && <SuccessMessage>{success}</SuccessMessage>}
    </BackupContainer>
  );
};

export default BackupManager; 