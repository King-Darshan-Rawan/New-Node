import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const app = express();
const PORT = 8000;

// Middleware
app.use(express.json());

let users = [];

async function loadUsers() {
  try {
    const data = await readFile(new URL('./MOCK_DATA.json', import.meta.url), 'utf8');
    users = JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

await loadUsers();

console.log("Hello express");

app.get('/users', (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `
        <div class="user-data">
            <h2>User Data</h2>
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>First Name:</strong> ${user.first_name}</p>
            <p><strong>Last Name:</strong> ${user.last_name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Gender:</strong> ${user.gender}</p>
            <p><strong>Job Title:</strong> ${user.job_title}</p>
        </div>
    `).join('')}
    </ul>
    `;
  res.send(html);
});

app.route('/api/users')
  .get((req, res) => {
    return res.json(users);
  })
  .post(async (req, res) => {
    const body = req.body;
    console.log("Request body:", body); // Log the request body

    if (!body) {
      return res.status(400).json({ status: "error", message: "Invalid request body" });
    }

    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);
    console.log("Updated users array:", users); // Log the updated users array

    try {
      await writeFile(new URL('./MOCK_DATA.json', import.meta.url), JSON.stringify(users, null, 2));
      console.log("Successfully wrote to file"); // Confirm successful write operation
      return res.json({ status: "done" });
    } catch (err) {
      console.error("Error writing to file", err); // Log any error that occurs while writing the file
      return res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
  });

app.route('/api/users/:id')
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    // edit
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    // delete
    return res.json({ status: "pending" });
  });

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
