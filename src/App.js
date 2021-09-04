import React, {useState} from 'react';
import {finalSpaceCharacters} from './util/data'
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function App() {

  const [characters, updateCharacters] = useState(finalSpaceCharacters);

  const handleOnDragEnd = (result) => {
    console.log(result);
    // we can simply add a statement above the code that moves our item around that 
    // checks if the destination exists, and if it doesn’t, exits out of the function:
    if (!result.destination) return;
    /* 
      --> We create a new copy of our characters array
      --> We use the source.index value to find our item from our new array and 
      remove it using the splice method
      --> That result is destructured, so we end up with a new object of 
      reorderedItem that is our dragged item
      --> We then use our destination.index to add that item back into the array, 
      but at it’s new location, again using splice
      --> Finally, we update our characters state using the updateCharacters function
    */
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  return (
    <div className="App">
    <header className="App-header">
      <h1>Final Space Characters</h1>
      {/* 
        When the components rerender, our items go back to the same place that they were before, 
        because we never saved that outside of DnD’s memory.

        To resolve this, DragDropContext takes in an onDragEnd prop that will allow 
        us to fire a function after dragging has complete. That function passes in 
        arguments that includes the new order of our items so that we can update our 
        state for the next render cycle. 
      */}
      {/* 
        DragDropContext is going to give our app the ability to use the library. 
        It works similarly to React’s Context API, where the library can now have 
        access to the component tree.

        Note: If you plan on adding drag and drop to more than one list, 
        you need to make sure that your DragDropContext wraps all of those items, 
        like at the root of your application. You can not nest DragDropContext. 
      */}
          {/* The DragDropContext component that we added to our page takes in a prop onDragEnd. 
          Like it sounds, that will fire a function whenever someone stops dragging an 
          item in the list. */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="characters">
          {/* The provided argument include information and references to 
          code that the library needs to work properly. */}
          {(provided) => (
            /* This is going to create a reference (provided.innerRef) for the library to access the list 
            element’s HTML element.  It also applies props to the element (provided.droppableProps) 
            that allows the library to keep track of movements and positioning. */
            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
              {characters.map(({id, name, thumb}, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}
                      >
                        <div className="characters-thumb">
                          <img src={thumb} alt={`${name} Thumb`} />
                        </div>
                        <p>
                          { name }
                        </p>
                      </li>
                    )}                  
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          )}     
        </Droppable>
      </DragDropContext>
    </header>
    <p>
      Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
    </p>
  </div>
  );
}

export default App;
