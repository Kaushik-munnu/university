import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const MyPerformance = () => {
    const [marks, setMarks] = useState([]);
    const [subjects, setSubjects] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const marksResponse = await axios.get('http://localhost:8000/marks', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMarks(marksResponse.data);

            const subjectsResponse = await axios.get('http://localhost:8000/subjects');
            setSubjects(subjectsResponse.data);
        };
        fetchData();
    }, []);

    const data = marks.map((mark) => {
        const subject = subjects.find((subject) => subject._id === mark.subjectId);
        return { name: subject?.name, value: mark.mark };
    });

    return (
        <div>
            <h1>My Performance</h1>
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </div>
    );
};

export default MyPerformance;
