import React, {useEffect} from 'react';
import { Dialog } from 'primereact/dialog';
import styles from './CSS/notes.module.css';
import {Button} from "primereact/button";
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import log from "eslint-plugin-react/lib/util/log.js";



function Notes() {
    const [notes, setNotes] = React.useState([]);
    const[visible, setVisible] = React.useState(false);
    const URL = "http://localhost:8081/api/v1/notes/"
    const[tempNoteTitle, setTempNoteTitle] = React.useState();
    const[tempNoteBody, setTempNoteBody] = React.useState();
    const[selectedNote, setSelectedNote] = React.useState();


    useEffect(() =>{
        allNotes();
    }, []);

    let allNotes = async() => {
        try
        {
            let response = await fetch(URL + 'all', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
            if (!response.ok) {
                log.error(`HTTP error! Status: ${response.status}`);
            }
            let result = await response.json();
            setNotes(result.notes);
        } catch (error) {
            console.error('Error fetching NOTES data:', error);
        }
    }

    function showNoteContent(ID){
        setSelectedNote(ID);
        document.getElementById("noteContent").innerHTML =
            notes.filter(note => note.ID===ID).map(item => item.body).toString();
    }

    async function handleNewNoteForm(e){
        e.preventDefault();
        try{
            let response = await fetch(URL,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({"title": tempNoteTitle, "body": tempNoteBody})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.status);
            allNotes();
        } catch (error) {
            console.error('Error adding NOTES data:', error);
        }
    }

    async function handleEditNote(e){
        e.preventDefault();
        console.log(selectedNote)
        console.log(tempNoteTitle);
        console.log(tempNoteBody);

        try {
            let response = await fetch(URL + selectedNote, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({"title": tempNoteTitle, "body": tempNoteBody})
            })

            console.log(response.status);
            document.getElementById("noteContent").innerHTML="";
            allNotes();
        } catch (error) {
            console.error('Error adding NOTES data:', error);
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
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            console.log(response.status);
            document.getElementById("noteContent").innerHTML="";
            allNotes()
        } catch (error) {
            console.error('Error deleting note.', error);
        }
    }

    return (
        <div className={styles.notesContainer}>
            <div className={styles.notesHeader}>
                <p className={styles.subtitle}>Notes</p>
                <div>
                    <Button label="+" onClick={() => setVisible(true)} />
                    <Dialog visible={visible}
                            className={styles.popup}
                            onHide={() => { if (!visible) return; setVisible(false); }}>

                        <InputText placeholder={"Name your note"}
                                   id={"newNoteTitle"}
                                   className={styles.popupInput}
                                   onChange={(e) => {
                                       setTempNoteTitle(e.target.value)
                                   }}></InputText><br/>
                        <InputTextarea placeholder={"Add your note here"}
                                       className={styles.popupInputArea}
                                       id={"newNoteBody"}
                                       onChange={(e) => {
                                     setTempNoteBody(e.target.value)
                        }}></InputTextarea><br/>
                        <div className={styles.popupButtons}>
                        <Button className={styles.popupCancelButton}
                                onClick={(event) => setVisible(false)}>
                            Cancel
                        </Button>
                        <Button type={"submit"}
                                className={styles.popupSubmitButton}
                                onClick={(event) => {
                                    handleNewNoteForm(event, newNoteTitle, newNoteBody);
                                    setVisible(false);
                                }}>
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
                            <div key={item.ID} className={"card"}
                                 style={{"backgroundColor": "rgba(240,240,240,0.7)"}}>
                                <span htmlFor={item.ID} className={styles.notesListItem}
                                      onClick={() => showNoteContent(item.ID)}>
                                    {item.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.noteBodyContainer}>
                    <div>
                        <div className={styles.noteBody} id={"noteContent"}
                        ></div>
                    </div>
                    <div className={styles.noteButtons}>
                        <button
                                onClick={() => {
                                    setVisible(true);
                                    setTempNoteTitle(notes.filter(x => x.ID === selectedNote).map(i => i.title))
                                    setTempNoteBody(notes.filter(x => x.ID === selectedNote).map(i => i.body))}} >
                            ✏️
                        </button>
                            {/*<div>*/}
                            {/*    <Button label="✏️"*/}
                            {/*            onClick={() => {*/}
                            {/*        setVisible(true);*/}
                            {/*        setTempNoteTitle(notes.filter(x => x.ID === selectedNote).map(i => i.title))*/}
                            {/*        setTempNoteBody(notes.filter(x => x.ID === selectedNote).map(i => i.body))*/}
                            {/*    }}/>*/}
                                <Dialog visible={visible} className={styles.popup}
                                        onHide={() => { if (!visible) return; setVisible(false); }}>

                                    <InputText
                                        value={tempNoteTitle}
                                               className={styles.popupInput}
                                               onChange={(e) => {
                                                   setTempNoteTitle(e.target.value)
                                               }}></InputText><br/>
                                    <InputTextarea
                                        value={tempNoteBody}
                                                   className={styles.popupInputArea}
                                                   onChange={(e) => {
                                                       setTempNoteBody(e.target.value)
                                                   }}></InputTextarea><br/>
                                    <div className={styles.popupButtons}>
                                        <Button className={styles.popupCancelButton}
                                                onClick={(event) => setVisible(false)}>
                                            Cancel
                                        </Button>
                                        <Button type={"submit"}
                                                className={styles.popupSubmitButton}
                                                onClick={(event) => {
                                                    handleEditNote(event);
                                                    setVisible(false);
                                                }}>
                                            Update note
                                        </Button>
                                    </div>

                                </Dialog>
                            {/*</div>*/}
                        {/*</button>*/}
                        <button onClick={(event) => handleDeleteNote(event)}>🗑️</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Notes;