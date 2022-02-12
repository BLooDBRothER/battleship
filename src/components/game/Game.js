import React, { useEffect, useReducer } from 'react';
import { ACTIONS, reducer } from './reducer';
import OpponentBoard from './OpponentBoard';
import PlayerBoard from './PlayerBoard';
import Ships from './Ships';
import Menu from '../menu/Menu';
import GameOver from './GameOver';

export const gameDataContext = React.createContext(null);

const Game = () => {
  const [gameData, dispatch] = useReducer(reducer, false);

  useEffect(() => {
    dispatch({type: ACTIONS.SET_INITIAL});
  }, [])

  useEffect(() => {
    console.log(gameData.currentPlayer)
  }, [gameData.currentPlayer]);

  useEffect(() => {
    if(gameData.currentPlayer === 'player_1' || gameData.playerWon !== '') return;
    setTimeout(() => {
      dispatch({type: ACTIONS.RANDOM_ATTACK});
    }, 300);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.currentPlayer]);


  return (
    <gameDataContext.Provider value={[gameData, dispatch]}>
      {gameData && 
        <div className='game' data-status={gameData.isGameStarted}>
            {!gameData.isGameStarted && <Menu />}
            <PlayerBoard />
            {!gameData.isGameStarted && <Ships />}
            {gameData.isGameStarted && <OpponentBoard currentPlayer={gameData.currentPlayer} />}
        </div>
      }
      {gameData && gameData.playerWon !== '' && <GameOver />}
    </gameDataContext.Provider>
  );
};

export default Game;
