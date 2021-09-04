import {finalSpaceCharacters} from './util/data'
import './App.css';
import { DragDropContext } from 'react-beautiful-dnd';

function App() {
  return (
    <div className="App">
    <header className="App-header">
      <h1>Final Space Characters</h1>

      <DragDropContext>
        <ul className="characters">
          {finalSpaceCharacters.map(({id, name, thumb}) => {
            return (
              <li key={id}>
                <div className="characters-thumb">
                  <img src={thumb} alt={`${name} Thumb`} />
                </div>
                <p>
                  { name }
                </p>
              </li>
            );
          })}
        </ul>
      </DragDropContext>
    </header>
    <p>
      Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
    </p>
  </div>
  );
}

export default App;
