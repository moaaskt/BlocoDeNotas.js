const notesContainer = document.getElementById("app");
const addNoteBtn = notesContainer.querySelector(".add-note");






getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);
});







addNoteBtn.addEventListener("click", () => addNote());




//recueprar as notas existentes no nosso navegador


function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}


//essa função vai salvar as notas no navegador

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}


//contruir um novo elemento para representar uma nota


function createNoteElement(id, content) {
  const element = document.createElement("textarea");

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Digite aqui sua nota";

  element.addEventListener("change", () => {
    updateNote(id, element.value);
  });

//exlcluir nota com double click

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Tem certeza que deseja exluir essa nota?"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });

  return element;
}




//adicionará novas notas e salvará no localstorage


function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 100000),
    content: ""
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteBtn);

  notes.push(noteObject);
  saveNotes(notes);
}


//atualizar as notas ou editar

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}


//função deletar as notas

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
