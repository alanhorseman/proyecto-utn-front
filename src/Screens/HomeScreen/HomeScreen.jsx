import React, { useEffect, useContext } from 'react';
import './HomeScreen.css';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../context/AuthContext';
import useRequest from '../../hooks/useRequest';
import { getAllWorkspaces } from '../../services/workspaceServices';

const HomeScreen = () => {
  const { logout, userData } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    sendRequest: fetchWorkspaces,
    loading: workspacesLoading,
    response: workspacesRes,
    error: workspacesError,
  } = useRequest();

  useEffect(() => {
    fetchWorkspaces(() => getAllWorkspaces());
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleSelectWorkspace = (workspace) => {
    navigate('/create-workspace', {
      state: {
        step: 4,
        workspaceName: workspace.workspace_nombre,
        userName: userData?.nombre || 'Miembro'
      }
    });
  };

  const workspacesList = workspacesRes?.data?.workspaces || [];

  return (
    <div className="slack-home-container">
      <div className="slack-purple-bg">
        <div className="slack-wave">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" fill="#ffffff" opacity=".10"></path>
            <path d="M0,0V15.81C13,36.92,276.49,121.78,566,116.41c248.45-4.6,466.9-62.79,634-16.61V0Z" fill="#ffffff"></path>
          </svg>
        </div>
      </div>

      <header className="slack-header">
        <div className="slack-logo-area">
          <img 
            src="https://a.slack-edge.com/bv1-13/slack_logo-e971fd7.svg" 
            alt="Slack Logo" 
            className="slack-logo-img" 
          />
        </div>
        
        <div className="slack-actions-area">
          <button className="slack-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="slack-main-content">
        <section className="slack-hero">
          <h1>¡Hola de nuevo, {userData?.nombre || ''}! <span className="emoji-wave">👋</span></h1>
          <p>Elige un espacio de trabajo para comenzar.</p>
        </section>

        <section className="slack-workspace-container">
          <div className="slack-workspace-header">
            <svg className="grid-icon" viewBox="0 0 24 24" width="18" height="18">
              <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
              <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
              <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
              <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
            </svg>
            <h2>Mis espacios de trabajo</h2>
          </div>

          <div className="slack-card">
            <div className="slack-card-tabs">
              <button className="tab-item active">Espacios de trabajo</button>
            </div>

            <div className="slack-card-body">
              <span className="body-subtitle">
                {workspacesLoading ? "Cargando tus espacios..." : "Listo para iniciar"}
              </span>
              
              {workspacesError && (
                <div className="workspaces-error-message" style={{ color: '#e01e5a', padding: '15px', textAlign: 'center' }}>
                  Ocurrió un error al cargar los espacios: {workspacesError}
                </div>
              )}

              {!workspacesLoading && !workspacesError && workspacesList.length === 0 && (
                <div className="no-workspaces-message" style={{ padding: '30px 15px', textAlign: 'center', color: '#555', fontSize: '15px' }}>
                  Aún no eres miembro de ningún espacio de trabajo. ¡Crea uno nuevo abajo!
                </div>
              )}

              {!workspacesLoading && !workspacesError && workspacesList.map((workspace) => (
                <div 
                  key={workspace.workspace_id?._id || workspace.member_id} 
                  className="workspace-item-row"
                  onClick={() => handleSelectWorkspace(workspace)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="workspace-main-info">
                    <div className="workspace-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#611f69', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>
                      {workspace.workspace_nombre ? workspace.workspace_nombre.substring(0, 2).toUpperCase() : "WS"}
                    </div>
                    <div className="workspace-text-details">
                      <h3>{workspace.workspace_nombre}</h3>
                      <div className="workspace-meta">
                        <svg viewBox="0 0 24 24" width="12" height="12" className="meta-user-icon">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5-4-8-4z" fill="currentColor"/>
                        </svg>
                        <span>Miembro • {workspace.member_rol === 'owner' ? 'Propietario' : 'Invitado'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="workspace-arrow">
                    <svg viewBox="0 0 24 24" width="24" height="24">
                      <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                    </svg>
                  </div>
                </div>
              ))}
            </div>

            <div className="slack-card-footer">
              <p className="link-create-workspace">
                <Link to={'/create-workspace'}>Crear un nuevo espacio de trabajo</Link>
              </p>
              
              <p className="footer-subtext">
                ¿No encuentras tu espacio de trabajo? <a href="#help" className="link-secondary">Prueba con otro correo electrónico</a>
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeScreen;


