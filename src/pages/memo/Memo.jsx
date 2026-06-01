import React, { useState } from 'react'
import './Memo.css';

function Memo() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [editedText, setEditedText] = useState("");

    const handleNoteAdd = () => {
        // 新しいオブジェクトの追加
        const newNote = {
            id: Date.now(),
            // 下の画像はメモと入力してから変換
            text: "新規ノート📝"
        }
        setNotes([...notes, newNote]);
        setSelectedNote(newNote);
        setEditedText(newNote.text);
    };
    const handleSelect = (note) => {
        setSelectedNote(note);
        setEditedText(note.text);
    }
    const handleDelete = (noteId) => {
        const filterNote = notes.filter((note) => note.id !== noteId);
        setNotes(filterNote);

        if (filterNote.length > 0) {
            const lastNote = filterNote[filterNote.length - 1];
            setSelectedNote(lastNote);
        } else {
            setSelectedNote(null);
        }
    }
    const handleChange = (e) => {
        setEditedText(e.target.value);
    }
    const handleSave = () => {
        const updatedNotes = notes.map((note) => {
            if (note.id === selectedNote.id) {
                return { ...note, text: editedText }
            }
            return note;
        });
        console.log(updatedNotes);
        setNotes(updatedNotes);
    }
    return (
        <div className="app-container">
            {/* sidebar */}
            <div className='sidebar'>
                <h1>メモ</h1>
                <button id='create' onClick={handleNoteAdd}>ノート追加</button>
                <ul>
                    {notes.map((note) => (
                        <li key={note.id} className={selectedNote?.id === note.id ? "selected" : ""}>
                            <button onClick={() => handleDelete(note.id)} className='delete'>削除</button>
                            <span onClick={() => handleSelect(note)}>{note.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* main */}
            <div className='main'>
                {selectedNote ? (
                    <>
                        <h2>内容</h2>
                        <textarea value={editedText} onChange={handleChange} />
                        <button onClick={handleSave} className='save'>保存</button>
                    </>
                ) : (
                    <div>
                        ノートを作成してください。
                    </div>
                )}
            </div>
        </div>
    );
}

export default Memo
