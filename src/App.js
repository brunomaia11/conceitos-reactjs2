import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";
function App() {
  const [respositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Novo Repository ' + Date.now()
    });

    const repository = response.data;

    setRepositories([...respositories, repository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete('repositories/' + id);

    setRepositories(respositories.filter(
      repository => repository.id !== id
    ));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {respositories.map(repo => (
          <li key={repo.id}>
            {repo.title}

            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
