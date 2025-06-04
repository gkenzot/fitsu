import { Routes, Route, Navigate } from 'react-router-dom';
import BaseLayout from '../components/layout/BaseLayout';
import PrivateRoute from '../components/PrivateRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Cadastro from '../pages/Cadastro';
import Dashboard from '../pages/Dashboard';
import Semana from '../pages/Semana';
import Treino from '../pages/Treino';
import NovoTreino from '../pages/NovoTreino';
import Perfil from '../pages/Perfil';
import EditarPerfil from '../pages/EditarPerfil';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Rotas protegidas */}
        <Route path="/app">
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="semana" element={
            <PrivateRoute>
              <Semana />
            </PrivateRoute>
          } />
          <Route path="treino" element={
            <PrivateRoute>
              <Treino />
            </PrivateRoute>
          } />
          <Route path="novo-treino" element={
            <PrivateRoute>
              <NovoTreino />
            </PrivateRoute>
          } />
          <Route path="perfil" element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          } />
          <Route path="editar-perfil" element={
            <PrivateRoute>
              <EditarPerfil />
            </PrivateRoute>
          } />
        </Route>

        {/* Redireciona qualquer rota não encontrada para a home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes; 