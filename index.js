const express=require('express');
const users=require('./MOCK_DATA.json');
const app=express();
const port=8000;

app.get('/user',(req,res)=>{
const html=`
<ul>
    ${users.map(u=>`<li>${u.first_name}</li>`).join('')}
</ul>
`;
return res.send(html);
});

app.get('/api/user',(req,res)=>{
   return res.json(users);
});

app.get('/api/user/:id',(req,res)=>{
    const id=Number(req.params.id);
    const u=users.find(u=>u.id==id);
    return res.json(u);
})


app.listen(8000,()=>{
    console.log(`Server is running on port ${port}`);
})