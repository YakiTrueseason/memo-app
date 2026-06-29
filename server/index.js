//expressの基本構成　バックエンド　サーバー
const express = require("express");
const cors = require("cors");

//サーバー本体
const app = express();

app.use(cors());
app.use(express.json());



//データベース作成
const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./todo.db",(err)=>{
    if(err){
        console.error(err.message);
    }else{
        console.log("SQLite connected");
    }
});

//sqlite 設計図
db.run(`
    CREATE TABLE IF NOT EXISTS todos(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        date TEXT,
        priority TEXT,
        tag TEXT,
        completed INTEGER DEFAULT 0
    )
    `)

// 動作確認用API
app.get("/",(req,res)=>{
    res.send("Express Server Running");
});

// ToDo取得API
app.get("/todos",(req,res)=>{
    db.all("SELECT * FROM todos",[],(err,rows)=>{
        if(err){
            return res.status(500).json(err);
        }
        res.json(rows);
    });
});

//エラー確認
db.all("PRAGMA table_info(todos)",[],(err,rows)=>{
    console.log(rows);
});

//テストデータ
db.run(`
    INSERT INTO todos(name,date,priority,tag,completed)
    VALUES(?,?,?,?,?)
    `,[
        "Reactの勉強",
        "2026-6-29",
        "高",
        "勉強",
        0
    ]);

//サーバー起動
app.listen(3001,()=>{
    console.log("Server Start");
})