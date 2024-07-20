import { readFile, writeFile } from 'fs/promises';
import { type } from 'os';
import { stringify } from 'querystring';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8001; // Changed port to 8001
app.use(express.json());

// Connect to the database
mongoose.connect('mongodb://localhost:27017/StoreData1', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
.then(() => {
  console.log('DB connected');
})
.catch((err) => {
  console.log('Error', err);
});

// Schema definition
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String
  },
  jobTitle: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

app.post("/api/users", async (req, res) => {
  const { firstName, lastName, email, gender, jobTitle } = req.body;
  
  if (!firstName || !lastName || !email) {
    return res.status(400).json({ msg: "First name, last name, and email are required" });
  }
  
  try {
    const result = await User.create({
      firstName,
      lastName,
      email,
      gender,
      jobTitle
    });
    console.log("result", result);
    return res.status(201).json({ msg: "success", user: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error creating user", error: error.message });
  }
});

// Server setup
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//using data from json file
// let users = [];

// async function loadUsers() {
//   try {
//     const data = await readFile(new URL('./MOCK_DATA.json', import.meta.url), 'utf8');
//     users = JSON.parse(data);
//   } catch (error) {
//     console.error('Error loading users:', error);
//   }
// }

// await loadUsers();

// // Middleware

// app.use((req,res,next)=>{
//   // if(users === 0){
//   //   console.log("yup")
//   //   res.json({"status": "over"})
//   // }
//   // else if("/users"){
//   //   console.log("sorry")
//   //   res.json({"status": "please meet again"})
//   // }

//   console.log("assigned to next");
//   next()
// })

 

// console.log(users)
// console.log("Hello express");

//html response

// app.get('/users', (req, res) => {
//   const html = `
//     <ul>
//     ${users.map((user) => `
//         <div class="user-data">
//             <h2>User Data</h2>
//             <p><strong>ID:</strong> ${user.id}</p>
//             <p><strong>First Name:</strong> ${user.first_name}</p>
//             <p><strong>Last Name:</strong> ${user.last_name}</p>
//             <p><strong>Email:</strong> ${user.email}</p>
//             <p><strong>Gender:</strong> ${user.gender}</p>
//             <p><strong>Job Title:</strong> ${user.job_title}</p>
//         </div>
//     `).join('')}
//     </ul>
//     `;
//   res.send(html);
// });

//response in json format

// app.route('/api/users')
//   .get((req, res) => {
//     return res.json(users);
//   })
//   .post(async (req, res) => {
//     const body = req.body;
//     console.log("Request body:", body); // Log the request body

//     if (!body) {
//       return res.status(400).json({ status: "error", message: "Invalid request body" });
//     }

//     const newUser = { ...body, id: users.length + 1 };
//     users.push(newUser);
//     console.log("Updated users array:", users); // Log the updated users array

//     try {
//       await writeFile(new URL('./MOCK_DATA.json', import.meta.url), JSON.stringify(users, null, 2));
//       console.log("Successfully wrote to file"); // Confirm successful write operation
//       return res.json({ status: "done" });
//     } catch (err) {
//       console.error("Error writing to file", err); // Log any error that occurs while writing the file
//       return res.status(500).json({ status: "error", message: "Internal Server Error" });
//     }
//   });

// app.route('/api/users/:id')
//   .get((req, res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     if (!user) {
//       return res.status(404).json({ status: "error", message: "User not found" });
//     }
//     return res.json(user);
//   })
//   .patch(async (req, res) => {
//     const id = Number(req.params.id);
//     const body = req.body;
//     console.log("Request body:", body); // Log the request body

//     const userIndex = users.findIndex((user) => user.id === id);
//     if (userIndex === -1) {
//       return res.status(404).json({ status: "error", message: "User not found" });
//     }

//     // Update the user's data
//     users[userIndex] = { ...users[userIndex], ...body };
//     console.log("Updated users array:", users); // Log the updated users array

//     try {
//       await writeFile(new URL('./MOCK_DATA.json', import.meta.url), JSON.stringify(users, null, 2));
//       console.log("Successfully wrote to file"); // Confirm successful write operation
//       return res.json({ status: "done" });
//     } catch (err) {
//       console.error("Error writing to file", err); // Log any error that occurs while writing the file
//       return res.status(500).json({ status: "error", message: "Internal Server Error" });
//     }
//   })
//   .delete(async (req, res) => {
//     const id = Number(req.params.id);
//     const userIndex = users.findIndex((user) => user.id === id);

//     if (userIndex === -1) {
//       return res.status(404).json({ status: "error", message: "User not found" });
//     }

//     // Remove the user from the array
//     users.splice(userIndex, 1);
//     console.log("Updated users array after deletion:", users); // Log the updated users array

//     try {
//       await writeFile(new URL('./MOCK_DATA.json', import.meta.url), JSON.stringify(users, null, 2));
//       console.log("Successfully wrote to file after deletion"); // Confirm successful write operation
//       return res.json({ status: "done" });
//     } catch (err) {
//       console.error("Error writing to file", err); // Log any error that occurs while writing the file
//       return res.status(500).json({ status: "error", message: "Internal Server Error" });
//     }
//   });

// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
