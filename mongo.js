const mongoose=require("mongoose")
mongoose.connect("mongodb://0.0.0.0:27017/university_dashboard")
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log('failed');
})


const newSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

app.post('/admin/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        const token = jwt.sign({ username }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// CRUD operations for fields/streams
app.get('/fields', async (req, res) => {
    const fields = await Field.find();
    res.json(fields);
});

app.post('/fields', async (req, res) => {
    const field = new Field(req.body);
    await field.save();
    res.json(field);
});

app.put('/fields/:id', async (req, res) => {
    const { id } = req.params;
    const field = await Field.findByIdAndUpdate(id, req.body, { new: true });
    res.json(field);
});

app.delete('/fields/:id', async (req, res) => {
    const { id } = req.params;
    await Field.findByIdAndDelete(id);
    res.sendStatus(204);
});

// CRUD operations for subjects
app.get('/subjects', async (req, res) => {
    const subjects = await Subject.find();
    res.json(subjects);
});

app.post('/subjects', async (req, res) => {
    const subject = new Subject(req.body);
    await subject.save();
    res.json(subject);
});

app.put('/subjects/:id', async (req, res) => {
    const { id } = req.params;
    const subject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    res.json(subject);
});

app.delete('/subjects/:id', async (req, res) => {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.sendStatus(204);
});

// CRUD operations for marks
app.get('/marks', async (req, res) => {
    const marks = await Mark.find();
    res.json(marks);
});

app.post('/marks', async (req, res) => {
    const mark = new Mark(req.body);
    await mark.save();
    res.json(mark);
});

app.put('/marks/:id', async (req, res) => {
    const { id } = req.params;
    const mark = await Mark.findByIdAndUpdate(id, req.body, { new: true });
    res.json(mark);
});

app.delete('/marks/:id', async (req, res) => {
    const { id } = req.params;
    await Mark.findByIdAndDelete(id);
    res.sendStatus(204);
});

// CRUD operations for students
app.post('/students', async (req, res) => {
    const { username, password, name, enrollmentYear, fieldId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const student = new Student({
        username,
        password: hashedPassword,
        name,
        enrollmentYear,
        fieldId
    });
    await student.save();
    res.json(student);
});

app.post('/students/login', async (req, res) => {
    const { username, password } = req.body;
    const student = await Student.findOne({ username });
    if (!student) {
        return res.status(401).send('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, student.password);
    if (!isValid) {
        return res.status(401).send('Invalid credentials');
    }
    const token = jwt.sign({ id: student._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
});

app.get('/students', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret_key');
    const student = await Student.findById(decoded.id).populate('fieldId');
    res.json(student);
});



const auth = mongoose.model("auth",newSchema)

module.exports=auth