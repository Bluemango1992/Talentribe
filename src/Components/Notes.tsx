import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Paper, Button, EmptyState, HeaderCard } from '../Components';
import { H4, Caption, P } from '../Typography';
import { FaTrash } from 'react-icons/fa';


const Notes = () => {

    const [notes, setNotes] = useState<any[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);


    const { organisationID } = useParams();

  
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:3001/notes')
            .then((response) => response.json())
            .then((data) => setNotes(data));
    }
    , []);
  
    const handleAddTask = () => {
        if (inputValue !== '') {
            fetch('http://localhost:3001/notes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: inputValue,
                    organisationID: organisationID, // send organisationID with the request
                }),
            })
            .then((response) => response.json())
            .then((data) => {
        // Update the state with the new client
        setNotes(prevNotes => [...prevNotes, data]);
        setInputValue('');
        setIsModalOpen(false);
            }
            )
            .catch((error) => {
                console.error("Error adding note: ", error);
            }
            );
        }
    };
         
    const handleDeleteTask = (index: number) => {
        setDeleteIndex(index);
        setDeleteModalOpen(true);
    };

    const confirmDelete = () => {
        if (deleteIndex !== null) {
            const noteToDelete = notes[deleteIndex];
            
            fetch(`http://localhost:3001/notes/${noteToDelete.id}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (response.ok) {
                    const newNotes = [...notes];
                    newNotes.splice(deleteIndex, 1);
                    setNotes(newNotes);
                } else {
                    throw new Error('Failed to delete the note.');
                }
            })
            .catch((error) => {
                console.error("Error deleting note: ", error);
            })
            .finally(() => {
                setDeleteModalOpen(false);
                setDeleteIndex(null);
            });
        }
    };       
    
    const formatDate = (dateString: string): string => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    
    return (
        <Paper>
                <div className="flex flex-col h-2/3">
                <HeaderCard heading='Notes' subHeading={`${notes.length} results`} onClick={() => setIsModalOpen(true)} />
            <ul className="p-4">
                {notes.length === 0 && <EmptyState message="No notes found." />}
                {notes.map((note, index) => (
                    <li key={index} className="flex mb-2 justify-between items-top flex-wrap text-ellipsis">
                        <div className="flex flex-col gap-2">
                        <P>{note.text}</P>
                        <Caption>{formatDate(note.created_at)}</Caption>
                        </div>
                    <button onClick={() => handleDeleteTask(index)}><FaTrash /></button>
                    </li>
                ))}
            </ul>
            </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg">
              <H4>Add a new note</H4>
              <textarea 
                className="border p-2 w-full rounded mt-2 min-w-[400px] max-w-[500px]"
                rows={5}
                maxLength={255}
                value={inputValue}
                onChange={handleInputChange} 
                placeholder="Type your note..."
              />
              <div className="flex gap-2 justify-end mt-4">
                <Button variant="primary" onClick={handleAddTask}>Add</Button>
                <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </div>
            </div>
          </div>
        )}

        {deleteModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-4 rounded-lg">
                    <H4>Are you sure you want to delete this note?</H4>
                    <div className="flex gap-2 justify-end mt-4">
                        <Button variant="primary" onClick={confirmDelete}>Confirm</Button>
                        <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
                    </div>
                </div>
            </div>
        )}
      </Paper>
    );
  };

export default Notes;
