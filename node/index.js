const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

// Adicionar um nome aleatório à tabela people
const addPerson = () => {
  const names = ["Alice", "Bob", "Charlie", "David", "Emma", "Frank", "Grace", "Henry", "Isabel", "Jack"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  
  const sql = `INSERT INTO people(name) VALUES('${randomName}')`;
  connection.query(sql);
  
  return randomName;
}

app.get('/', (req, res) => {
  // Adiciona um novo nome
  const addedName = addPerson();
  
  // Busca todos os nomes
  connection.query('SELECT * FROM people', (error, results) => {
    if (error) {
      throw error;
    }
    
    let html = '<h1>Full Cycle Rocks!</h1>';
    html += '<ul>';
    
    results.forEach(person => {
      html += `<li>${person.name}</li>`;
    });
    
    html += '</ul>';
    
    res.send(html);
  });
});

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
