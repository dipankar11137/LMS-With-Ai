const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.evn2ej1.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();

    const userCollection = client.db('lms').collection('user');
    const classCollection = client.db('lms').collection('class');
    const reviewCollection = client.db('lms').collection('reviews');
    const quizSolutionCollection = client.db('lms').collection('quizSolve');
    const questionCollection = client.db('lms').collection('question');
    const answerCollection = client.db('lms').collection('questionAnswer');

    // // // // // // // // // // // //

    //  *********  User  ********//

    // create and update a user
    app.put('/create-user/:email', async (req, res) => {
      const email = req.params.email;
      const user = req.body;

      const filter = { email: email };
      const options = { upsert: true };

      const updatedDoc = {
        $set: user,
      };

      const result = await userCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });
    // get all users from db
    app.get('/users', async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    // all User filter by email category
    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });
    // user update admin
    app.put('/admin/:id', async (req, res) => {
      const id = req.params.id;
      const updateAdmin = req.body;
      const query = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          admin: updateAdmin.admin,
        },
      };
      const result = await userCollection.updateOne(query, updateDoc, options);
      res.send(result);
    });
    // Delete user
    app.delete('/userDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
    // update web payment
    app.put('/webPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { webPayment: updatePayment.webPayment } },
        { upsert: true }
      );
      res.send(result);
    });
    // update data payment
    app.put('/dataPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { dataPayment: updatePayment.dataPayment } },
        { upsert: true }
      );
      res.send(result);
    });
    // update web payment
    app.put('/graphicPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { graphicPayment: updatePayment.graphicPayment } },
        { upsert: true }
      );
      res.send(result);
    });
    // update mobile payment
    app.put('/mobilePayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { mobilePayment: updatePayment.mobilePayment } },
        { upsert: true }
      );
      res.send(result);
    });
    // update Digital payment
    app.put('/digitalPayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { digitalPayment: updatePayment.digitalPayment } },
        { upsert: true }
      );
      res.send(result);
    });
    // update finance payment
    app.put('/financePayment/:id', async (req, res) => {
      const id = req.params.id;
      const updatePayment = req.body;
      const result = await userCollection.updateOne(
        { _id: ObjectId(id) },
        { $set: { financePayment: updatePayment.financePayment } },
        { upsert: true }
      );
      res.send(result);
    });

    // //  *********  appointments  ********//

    // post class
    app.post('/class', async (req, res) => {
      const result = await classCollection.insertOne(req.body);
      res.send(result);
    });
    // get class
    app.get('/class', async (req, res) => {
      const query = {};
      const cursor = classCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one class
    app.delete('/class/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await classCollection.deleteOne(query);
      res.send(result);
    });
    // class filter by course
    app.get('/classCourse/:course', async (req, res) => {
      const course = req.params.course;
      const query = { course };
      const cursor = classCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/classId/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }; // Ensure `ObjectId` is properly imported
        const result = await classCollection.findOne(query); // Use `findOne` for a single document
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ message: 'Booking not found' });
        }
      } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });

    // post review course
    app.post('/reviews', async (req, res) => {
      const result = await reviewCollection.insertOne(req.body);
      res.send(result);
    });

    // get review
    app.get('/reviews', async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // review filter by course
    app.get('/review/:course', async (req, res) => {
      const course = req.params.course;
      const query = { course };
      const cursor = reviewCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // // //  *********  solve quiz  ********//

    // Post solve
    app.post('/solve', async (req, res) => {
      const appointmentsBook = req.body;
      const result = await quizSolutionCollection.insertOne(appointmentsBook);
      res.send(result);
    });
    // get comments
    app.get('/solve', async (req, res) => {
      const query = {};
      const cursor = quizSolutionCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // solve filter by course
    app.get('/solveQuiz/:quiz', async (req, res) => {
      const quiz = req.params.quiz;
      const query = { quiz };
      const cursor = quizSolutionCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    // Delete one comment Remove
    app.delete('/solveDelete/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await quizSolutionCollection.deleteOne(query);
      res.send(result);
    });

    // post question
    app.post('/question', async (req, res) => {
      const result = await questionCollection.insertOne(req.body);
      res.send(result);
    });
    // get question
    app.get('/question', async (req, res) => {
      const query = {};
      const cursor = questionCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // Delete one question
    app.delete('/question/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await questionCollection.deleteOne(query);
      res.send(result);
    });
    // question filter by question
    app.get('/questionCourse/:course', async (req, res) => {
      const course = req.params.course;
      const query = { course };
      const cursor = questionCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post('/questionAnswer', async (req, res) => {
      const result = await answerCollection.insertOne(req.body);
      res.send(result);
    });
    app.get('/questionAnswer', async (req, res) => {
      const query = {};
      const cursor = answerCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });
    // question filter by question
    app.get('/questionAnswersCourse/:subject', async (req, res) => {
      const subject = req.params.subject; // ✅ fixed
      const query = { subject };
      const cursor = answerCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    //  answer filter by id
    app.get('/questionAnswersCourseId/:id', async (req, res) => {
      try {
        const id = req.params.id;

        // Validate ObjectId
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ error: 'Invalid ID format' });
        }

        const query = { _id: new ObjectId(id) };
        const result = await answerCollection.findOne(query);

        if (!result) {
          return res.status(404).send({ error: 'Answer not found' });
        }

        res.send(result);
      } catch (error) {
        console.error('Error fetching answer by course ID:', error);
        res.status(500).send({ error: 'Failed to fetch data' });
      }
    });
    // });
    app.get('/classIds/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) }; // Ensure `ObjectId` is properly imported
        const result = await answerCollection.findOne(query); // Use `findOne` for a single document
        if (result) {
          res.status(200).send(result);
        } else {
          res.status(404).send({ message: 'Booking not found' });
        }
      } catch (error) {
        console.error('Error fetching booking by ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
      }
    });
    //  update marks
    app.put('/updateMark/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { totalMarks } = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { totalMarks: totalMarks },
        };
        const result = await answerCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error', error });
      }
    });
    //  recheck
    app.put('/reCheck/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { reCheck } = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { reCheck: reCheck },
        };
        const result = await answerCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error', error });
      }
    });

    //  requested
    app.put('/requested/:id', async (req, res) => {
      try {
        const id = req.params.id;
        const { requested } = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: { requested: requested },
        };
        const result = await answerCollection.updateOne(query, updateDoc);
        res.send(result);
      } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error', error });
      }
    });

    // Delete one question
    app.delete('/questionAnswersCourses/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await answerCollection.deleteOne(query);
      res.send(result);
    });

    
    //  watch video click
    // PUT /updateWatched/:email
    app.put('/updateWatched/:email', async (req, res) => {
      const email = req.params.email;
      const { videoId } = req.body;

      try {
        const user = await userCollection.findOne({ email });
        if (!user) {
          await userCollection.insertOne({ email, watchedVideos: [videoId] });
          return res.send({ message: 'User created and video added' });
        }

        const watched = user.watchedVideos || [];
        if (!watched.includes(videoId)) watched.push(videoId);

        await userCollection.updateOne(
          { email },
          { $set: { watchedVideos: watched } }
        );

        res.send({ message: 'Watched video updated', watchedVideos: watched });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Update failed' });
      }
    });

    app.get('/user/:email', async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    

   


    //
  } finally {
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Running LMS ');
});

app.listen(port, () => {
  console.log('LMS  server is running ');
});
