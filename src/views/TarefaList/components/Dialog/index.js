import React, { useState } from 'react';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@material-ui/core';

const Dialogo = props => {
  const [openDialog, setOpenDialog] = useState(true);
  return (
    <Dialog
      onClose={() => setOpenDialog(false)}
      open={openDialog}
    >
      <DialogTitle>Atenção</DialogTitle>
      <DialogContent>{props.msg}</DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Dialogo;
