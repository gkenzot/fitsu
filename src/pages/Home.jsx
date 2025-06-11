import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeroSection = styled.section`
  background: linear-gradient(to right, ${props => props.theme.colors.primary}, ${props => props.theme.colors.primaryDark});
  color: ${props => props.theme.colors.text.primary};
  padding: 5rem 0;
`;

const HeroContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: ${props => props.theme.colors.text.secondary};
`;

const CTAButton = styled(Link)`
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.background.main};
  padding: 1rem 2rem;
  border-radius: ${props => props.theme.borderRadius.full};
  font-size: 1.125rem;
  font-weight: 600;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: ${props => props.theme.colors.secondaryDark};
  }
`;

const FeaturesSection = styled.section`
  padding: 5rem 0;
`;

const FeaturesContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const FeaturesTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
  color: ${props => props.theme.colors.text.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const FeatureCard = styled.div`
  text-align: center;
  padding: 1.5rem;
  background-color: ${props => props.theme.colors.background.card};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${props => props.theme.colors.text.primary};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text.secondary};
`;

const Home = () => {
  const handleSave = () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const completedExercises = exercises.filter(ex => ex.status === 'completed');
    const missedExercises = exercises.filter(ex => ex.status === 'missed');
    
    const newHistory = {
      id: Date.now(),
      date: currentDate,
      status: completedExercises.length === exercises.length ? 'completed' : 
              missedExercises.length > 0 ? 'missed' : 'pending',
      exercises: exercises.map(ex => ({
        id: ex.id,
        name: ex.name,
        sets: ex.sets,
        reps: ex.reps,
        weight: ex.weight,
        status: ex.status,
        level: ex.level
      }))
    };

    setHistory(prev => [newHistory, ...prev]);
    resetExercises();
    setShowModal(false);
  };

  const handleExerciseStatusChange = (exerciseId, newStatus) => {
    setExercises(prev => prev.map(ex => 
      ex.id === exerciseId ? { ...ex, status: newStatus } : ex
    ));
  };

  const handleReset = () => {
    if (window.confirm('Tem certeza que deseja resetar todos os exercícios?')) {
      resetExercises();
    }
  };

  const resetExercises = () => {
    setExercises(prev => prev.map(ex => ({
      ...ex,
      status: 'pending',
      weight: ex.weight
    })));
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <Title>Transforme sua jornada fitness</Title>
          <Subtitle>
            Acompanhe seus treinos, defina metas e alcance resultados extraordinários com o Fitsu.
          </Subtitle>
          <CTAButton to="/cadastro">Comece Agora</CTAButton>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <FeaturesContainer>
          <FeaturesTitle>Por que escolher o Fitsu?</FeaturesTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon>🎯</FeatureIcon>
              <FeatureTitle>Metas Personalizadas</FeatureTitle>
              <FeatureDescription>
                Defina e acompanhe suas metas de forma personalizada.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>📊</FeatureIcon>
              <FeatureTitle>Acompanhamento Detalhado</FeatureTitle>
              <FeatureDescription>
                Visualize seu progresso com gráficos e estatísticas detalhadas.
              </FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon>💪</FeatureIcon>
              <FeatureTitle>Treinos Otimizados</FeatureTitle>
              <FeatureDescription>
                Receba treinos personalizados baseados no seu nível.
              </FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesContainer>
      </FeaturesSection>
    </>
  );
};

export default Home; 