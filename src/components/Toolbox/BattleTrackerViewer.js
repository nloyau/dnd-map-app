import { Paper, Box, Typography } from '@mui/material';
import { Fragment } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const BattleTrackerViewer = ({ open, encounter }) => {
    if (!open) return null;

    return (
        <Paper
          elevation={3}
          style={{
            position: 'absolute',
            top: '0%',
            left: '0%',
            width: '300px',
            padding: '16px',
            zIndex: 1300, // Ensure it's above other content
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" id="draggable-dialog-title">
            <Typography variant="h6">Battle Tracker</Typography>
          </Box>
          {encounter && 
            <Fragment>
                <Typography variant="h6">Round: {encounter.rounds}</Typography>
                <TableContainer component={Paper}>
                    <Table size='small' aria-label="simple table">
                        <TableBody>
                            {encounter.characters.map((character, i) => (
                                <TableRow
                                key={character.name}
                                style={{backgroundColor: i == encounter.turn ? 'rgba(254, 241, 96,0.3)' : character.enemy ? 'rgba(255,0,0,0.3)' : ''}}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{character.initiative}</TableCell>
                                    <TableCell align="left" component="th" scope="row">
                                        {character.name}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Fragment>
        }
        </Paper>
    );
  };

export default BattleTrackerViewer;