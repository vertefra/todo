// FUNCTIONS

const appendToColumn = (title, body, id, state, todosArray) => {
    console.log('in append ', todosArray )
    // target the column with id = noteState
    const $column = $(`#`+state)
    // Append the note to column
    // create a new div with class of note
    const $note = $(
        `<div class='note' id=${id}>`
    )
    const $title = $(
        `<input type='text' class="title" value="${title}" readonly="true">`
    )
    const $body = $(
        `<textarea class="body" readonly="true">${body}</textarea>`
    )
    const $removeBtn = $(
        `<button class="remove">remove</button>`
    )
    const $editBtn = $(
        `<button class="edit">edit</button>`
    )
    // appending all the elements to the note
    $note.append($title, $body, $removeBtn, $editBtn)
    $column.append($note)
    
    // Setting event listener for note buttons

    $removeBtn.on("click", (event)=>{
        removeNote(event, todosArray)
    })
    $editBtn.on("click", (event)=>{
        console.log('click')
        editNote(event, todosArray)
    })
    return $note[0]
}

const removeNote = (event, todosArray) => {
    const $thisNote = $(event.currentTarget).parent()
    const noteId = $thisNote.attr('id')
    $thisNote.remove()
    const noteIdx = todosArray.findIndex(note => note.id === noteId) 
    todosArray.splice(noteIdx, 1)
}

const editNote = (event, todosArray) => {
    const $editBtn =  $(event.currentTarget)
    const $thisNote = $editBtn.parent()
    const noteId = $thisNote.attr('id')
    const $title = $thisNote.children().eq(0)
    const $body = $thisNote.children().eq(1)
    // find the note in the todosArray to update it
    // when the title or the body are changed
    console.log(noteId)
    const thisNote = todosArray.find(note => note.id === parseInt(noteId))
    console.log(thisNote)
    // togglin from edit to read mode
    if($thisNote.hasClass('editing')){
        console.log(($thisNote.hasClass('editing')))
        $title.attr('readonly', true)
        $body.attr('readonly', true)
        $thisNote.toggleClass('editing')
        $editBtn.text('Edit')
    } else if(!$thisNote.hasClass('editing')) {
        console.log(($thisNote.hasClass('editing')))
        $title.attr('readonly', false)
        $body.attr('readonly', false)
        $thisNote.toggleClass('editing')
        $editBtn.text('Done!')
        $title.on("change", (event)=>{
            thisNote.update(event.currentTarget.value, undefined)
        })
        $body.on("change", (event)=>{
            thisNote.update(undefined, event.currentTarget.value)
        })
    }
}

// CLASSES

class Desktop{
    constructor(todos=[]){
        this.todos = todos
        this.globaId = 0
    }
    loadNotes(){
    
    }
    saveNotes(){
        localStorage.clear('todos')
        for(let note of this.todos){
            localStorage.setItem(
                'todos',JSON.stringify(note)
            )
        }
    }
}

class Note{
    constructor(desktopObj, title='title', body='text here'){
        this.title = title
        this.body = body
        this.state = 'todo'  // state could be 'todo' 'inprogress' 'done'
        this.desktop = desktopObj
    }
    setId(){
        this.desktop.globaId ++
        this.id = this.desktop.globaId
        return this.id
    }
    append(){
        // check note state
        this.desktop.todos.push(this)
        // insert in the same array as it's status
        return appendToColumn(
            this.title, 
            this.body, 
            this.id, 
            this.state,
            this.desktop.todos
        )
        // saving changes
    }

    update(newTitle=undefined, newBody=undefined){
        newTitle ? this.title = newTitle : null
        newBody ? this.body = newBody : null
    }

    changeNoteState(newState){ // state can be "todo" "inprogress" "done"
        this.state = newState
    }

}

export { Desktop, Note }