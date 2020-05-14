import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { TarefasToolbar, TarefasTable } from './components';
import Dialog from './components/Dialog/';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const headers = { 'x-tenant-id': 'teste@email.com' };
const TarefaList = () => {
  const classes = useStyles();

  const [tarefas, setTarefas] = useState('');
  //const [mensagem, setMensagem] = useState('');

  const salvar = tarefa => {
    api
      .post('/tarefas', tarefa, {
        headers
      })
      .then(resp => {
        const novaTarefa = resp.data;
        setTarefas([...tarefas, novaTarefa]);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const listarTarefas = () => {
    api
      .get('/tarefas', {
        headers
      })
      .then(resp => {
        const listaDeTarefas = resp.data;
        console.log(listaDeTarefas);

        setTarefas(listaDeTarefas);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const alterarStatus = id => {
    api
      .patch(`/tarefas/${id}`, null, {
        headers
      })
      .then(() => {
        const lista = [...tarefas];
        lista.forEach(tarefa => {
          if (tarefa.id === id) {
            tarefa.done = true;
          }
        });
        setTarefas(lista);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deletar = id => {
    api
      .delete(`/tarefas/${id}`, {
        headers
      })
      .then(() => {
        const lista = tarefas.filter(tarefa => tarefa.id !== id);
        setTarefas(lista);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    listarTarefas();
  }, []);

  return (
    <div className={classes.root}>
      <TarefasToolbar create={salvar} />
      <div className={classes.content}>
        <TarefasTable
          alterar={alterarStatus}
          deletar={deletar}
          tarefas={tarefas}
        />
      </div>
      <Dialog msg="teste" />
    </div>
  );
};

export default TarefaList;
