// script.js

// Load existing notes from local storage on page load
document.addEventListener("DOMContentLoaded", loadNotes);

// Event listener for the "Add New Note" button
document.getElementById("addNoteBtn").addEventListener("click", addNewNote);

// Function to load notes from local storage
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.forEach(noteContent => createNoteElement(noteContent));
}

// Function to add a new note
function addNewNote() {
  createNoteElement("");
}

// Function to create and display a note element
function createNoteElement(content) {
  const notesContainer = document.getElementById("notesContainer");

  // Create note element
  const note = document.createElement("div");
  note.classList.add("note");

  // Create textarea for note content
  const textarea = document.createElement("textarea");
  textarea.value = content;
  textarea.addEventListener("input", saveNotes);

  // Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "X";
  deleteBtn.addEventListener("click", () => {
    note.remove();
    saveNotes();
  });

  // Append elements to the note and notesContainer
  note.appendChild(textarea);
  note.appendChild(deleteBtn);
  notesContainer.appendChild(note);

  saveNotes();
}

// Function to save all notes to local storage
function saveNotes() {
  const notes = [];
  document.querySelectorAll(".note textarea").forEach(note => notes.push(note.value));
  localStorage.setItem("notes", JSON.stringify(notes));
}
