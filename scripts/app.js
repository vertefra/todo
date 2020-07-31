import {
    Note,
    Desktop
} from './objects.js'


// SETTING DROPPABLES


const settingDragAndDrod = (DOMnoteEl) => {
    DOMnoteEl.setAttribute('draggable', true)
    DOMnoteEl.ondragstart = (e) => {
        e.dataTransfer.setData('noteId', e.target.id)
    }
}


// creating a new desktop where to store notes and the globalId to 
// generate unique id for every note.

const desktop = new Desktop()


// SETTING DRAGGABLES

const columns = document.querySelectorAll('.column')
for (let column of columns){
    column.ondragover = (e) => {
        e.preventDefault()
    }
    column.ondrop = (e) => {
        e.preventDefault()
        const newNoteState = e.target.id
        const noteId = e.dataTransfer.getData("noteId")
        // get the note with id===data from the drop
        const DOMnote = document.getElementById(noteId)
        const note = desktop.todos.find(note=>note.id === parseInt(noteId))
        note.state = newNoteState
        const currentColumn = document.getElementById(newNoteState)
        currentColumn.appendChild(DOMnote)
    }
}

// ------------------------------------------------------------ //

// Event Listener

$('#add-todo').on("click", (event)=>{
    const note = new Note(desktop)
    // assign a new id to the note. it will be the id used also to 
    // identify the note in the DOM
    note.setId()
    const DOMnote = note.append()
    settingDragAndDrod(DOMnote)
})

//





