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

// Todo追加
app.post("/todos",(req,res)=>{
    const{name,date,priority,tag}=req.body;
    db.run(
        `INSERT INTO todos(name,date,priority,tag,completed)
        VALUES(?,?,?,?,0)`,
        [name,date,priority,tag],
        function(err){
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                id:this.lastID
            });
        }
    );
});

//Todo編集
app.put("/todos/:id",(req,res)=>{
    const{
        name,
        date,
        priority,
        tag,
        completed
    }=req.body;

    db.run(
        `UPDATE todos
        SET
            name = ?,
            date = ?,
            priority = ?,
            tag = ?,
            completed = ?
        WHERE id = ?
            `,
            [
                name,
                date,
                priority,
                tag,
                completed,
                req.params.id
            ],
            function(err){
                if(err){
                    return res.status(500).json(err);
                }
                res.json({
                    succes:true
                });
            }
    );
});

//削除
app.delete("/todos/:id",(req,res)=>{
    db.run(
        "DELETE FROM todos WHERE id=?",
        [req.params.id],
        function(err){
            if(err){
                return res.status(500).json(err);
            }
            res.json({
                success:true
            });
        }
    );
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
        "2026-06-29",
        "高",
        "勉強",
        0
    ]);

//サーバー起動
app.listen(3001,()=>{
    console.log("Server Start");
})