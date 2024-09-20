import React, {useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import styles from './CSS/notes.module.css';
import {Button} from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

function Notes() {
    const [notes, setNotes] = React.useState([]);
    const[visible, setVisible] = React.useState(false);
    const[visibleUpdate, setVisibleUpdate] = React.useState(false);
    const URL = "http://192.168.50.50:8081/api/v1/notes/"
    const[newNoteTitle, setNewNoteTitle] = React.useState("");
    const[newNoteBody, setNewNoteBody] = React.useState("");
    const[tempNoteTitle, setTempNoteTitle] = React.useState("");
    const[tempNoteBody, setTempNoteBody] = React.useState("");
    const[selectedNote, setSelectedNote] = React.useState();

    useEffect(() =>{
        allNotes().then(resetValues);
    }, []);

    let allNotes = async() => {
        try {
            let response = await fetch(URL + 'all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
            let result = await response.json();
            setNotes(result.notes);
        } catch (error) {
            console.error('Error fetching NOTES data:', error);
        }
    }

    function showNoteContent(){
        let noteX = notes.filter(note => note.ID===selectedNote);
        document.getElementById("noteContent").innerHTML = noteX.body;
    }

    async function handleNewNoteForm(e){
        e.preventDefault();
        try{
            await fetch(URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({"title": newNoteTitle, "body": newNoteBody})
            });
        } catch (error) {
            console.error('Error adding NOTES data:', error);
        }
    }

    async function handleEditNote(e){
        e.preventDefault();
        console.log("==> " + newNoteTitle);
        console.log("==> " + newNoteBody);
        console.log("==> " + tempNoteTitle);
        console.log("==> " + tempNoteBody);

        try {
            await fetch(URL + selectedNote, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({"title": tempNoteTitle, "body": tempNoteBody})
            })
            document.getElementById("noteContent").innerHTML="";
        } catch (error) {
            console.error('Error editing note data:', error);
        }
    }

    async function handleDeleteNote(e){
        e.preventDefault();
        try {
            console.log(URL+selectedNote)
            let response = await fetch(URL+selectedNote,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log(response.status);
            document.getElementById("noteContent").innerHTML="";
        } catch (error) {
            console.error('Error deleting note.', error);
        }
    }

    function resetValues(){
        setNewNoteBody("");
        setNewNoteBody("");
        setTempNoteTitle("");
        setTempNoteBody("");

    }

    return (
        <div className={styles.notesContainer}>
            <div className={styles.notesHeader}>
                <p className={styles.subtitle}>Notes</p>
                <div>
                    <Button label="+" onClick={() => { setVisible(true)}} />
                    <Dialog visible={visible} className={styles.popup} onHide={() => { if (!visible) return; setVisible(false); }}>
                        <InputText placeholder={"Name your note"} id={"newNoteTitle"} className={styles.popupInput}
                                   onChange={(e) => { setNewNoteTitle(e.target.value)}}></InputText><br/>
                        <InputTextarea placeholder={"Add your note here"} className={styles.popupInputArea}
                                       id={"newNoteBody"} onChange={(e) => { setNewNoteBody(e.target.value)}}></InputTextarea><br/>
                        <div className={styles.popupButtons}>
                        <Button className={styles.popupCancelButton} onClick={(event) => setVisible(false)}>
                            Cancel
                        </Button>
                        <Button type={"submit"} className={styles.popupSubmitButton} onClick={(event) => {
                                    handleNewNoteForm(event, newNoteBody, newNoteTitle).then(r => allNotes());
                                    setVisible(false);}}>
                            Add new note
                        </Button>
                        </div>
                    </Dialog>
                </div>
            </div>

            <div className={styles.contentBoxes}>
                <div className={styles.notesList }>
                    <div>
                        {notes.map(item => (
                            <div key={item.ID} className={"card"} style={{"backgroundColor": "rgba(240,240,240,0.7)"}}>
                                <span htmlFor={item.ID} className={styles.notesListItem}
                                      onClick={() => { setSelectedNote(item.ID); showNoteContent(); }}>
                                    {item.title}
                                </span>
                            </div> ))}
                    </div>
                </div>

                <div className={styles.noteBodyContainer}>
                    <div>
                        <div className={styles.noteBody} id={"noteContent"}></div>
                    </div>
                    <div className={styles.noteButtons}>
                        <button onClick={() => {
                                    setTempNoteTitle(notes.filter(x => x.ID === selectedNote).map(i => i.title))
                                    setTempNoteBody(notes.filter(x => x.ID === selectedNote).map(i => i.body))
                                    setVisibleUpdate(true);}} >
                            ✏️
                        </button>
                                <Dialog visible={visibleUpdate} className={styles.popup}
                                        onHide={() => { if (!visibleUpdate) return; setVisibleUpdate(false); }}>
                                    <InputText value={tempNoteTitle} className={styles.popupInput}
                                               onChange={(e) => {setTempNoteTitle(e.target.value)}}></InputText><br/>
                                    <InputTextarea value={tempNoteBody} className={styles.popupInputArea}
                                                   onChange={(e) => { setTempNoteBody(e.target.value)}}></InputTextarea><br/>
                                    <div className={styles.popupButtons}>
                                        <Button className={styles.popupCancelButton} onClick={() => setVisibleUpdate(false)}>
                                            Cancel
                                        </Button>
                                        <Button type={"submit"} className={styles.popupSubmitButton}
                                                onClick={(event) => { handleEditNote(event).then(r => allNotes());
                                                    setVisibleUpdate(false);}}>
                                            Update note
                                        </Button>
                                    </div>
                                </Dialog>
                        <button onClick={(event) => handleDeleteNote(event)}>🗑️</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notes;