const noteInput = document.getElementById("note_input");
const submitButton = document.getElementById("submit_note_btn");
const notesListContainer = document.getElementById("notes_list_container");

function saveNoteLocally(note) {
  if (!note) return;
  const li = document.createElement("li");
  li.textContent = note;
  notesListContainer.appendChild(li);
}

submitButton.addEventListener("click", function () {
  const note = noteInput.value;
  if (!note) return;

  saveNoteLocally(note);
  noteInput.value = "";
});
