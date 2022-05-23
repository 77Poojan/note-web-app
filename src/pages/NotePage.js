import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
    const {noteId} = useParams()
    const history = useNavigate()

    let [note, setNote] = useState(null)

    useEffect(() => {
        async function getNote(){
            try {
                if (noteId === 'new') return

                let response = await axios.get(`/api/notes/${noteId}/`)
                setNote(response.data)    
            } 
    
            catch(error) {
                console.log(error);
            }
        }
    
        getNote()
    }, [noteId]) 

    async function createNote(){
        try {
            await axios({
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json' 
                        },
                    url: `/api/notes/`,
                    data: JSON.stringify(note) 
            }).then(() => {
                history('/')
            })
        } 

        catch(error) {
            console.log(error);
        }
    }

    
    async function updateNote(){
        try {
            await axios({
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json' 
                        },
                    url: `/api/notes/${noteId}/`,
                    data: JSON.stringify(note)
            }).then(() => {
                history('/')
            })
        } 

        catch(error) {
            console.log(error);
        }
    }

    async function deleteNote(){
        try {
            await axios({
                    method: 'DELETE',
                    headers: {
                        'Content-Type' : 'application/json' 
                        },
                    url: `/api/notes/${noteId}/`, 
            }).then(() => {
                history('/')
            })
        } 

        catch(error) {
            console.log(error);
        }
    }
    
    let handleSubmit = () => {
        if (noteId !== 'new' && note.body === ''){
            deleteNote()
        }
        else if (noteId !== 'new'){
            updateNote()
        }
        else if (noteId === 'new' && note !== null){
            createNote()
        }
    }

    let handleChange = (value) => {
        setNote(note => ({...note, 'body': value }))
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit} />
                </h3>   
                {noteId !=='new' ?  
                    ( <button onClick={deleteNote}> Delete </button> ) : 
                    ( <button onClick={handleSubmit}> Done </button> ) 
                }
            </div>
            <textarea onChange={(e) => { handleChange(e.target.value) }} value={note?.body}></textarea>
        </div>
    )
}

export default NotePage