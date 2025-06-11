/**
 * Funções utilitárias para backup e restauração de dados
 */

/**
 * Exporta todos os dados do aplicativo para um arquivo JSON
 * @returns {string} URL do arquivo para download
 */
export const exportData = () => {
  const data = localStorage.getItem('fitsu_data');
  if (!data) {
    throw new Error('Nenhum dado encontrado para exportar');
  }

  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  // Cria um link temporário para download
  const link = document.createElement('a');
  link.href = url;
  link.download = `fitsu_backup_${new Date().toISOString().split('T')[0]}.json`;
  
  // Simula o clique no link
  document.body.appendChild(link);
  link.click();
  
  // Limpa
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Importa dados de um arquivo JSON
 * @param {File} file - Arquivo JSON com os dados
 * @returns {Promise<Object>} Dados importados
 */
export const importData = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        // Validação básica da estrutura dos dados
        if (!data.workouts || !data.exercises) {
          throw new Error('Arquivo inválido: estrutura de dados incorreta');
        }
        
        // Salva os dados no localStorage
        localStorage.setItem('fitsu_data', JSON.stringify(data));
        resolve(data);
      } catch (error) {
        reject(new Error('Erro ao importar dados: ' + error.message));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Erro ao ler o arquivo'));
    };
    
    reader.readAsText(file);
  });
}; 