const express=require('express');
const users=require('./MOCK_DATA.json');
const app=express();
const fs=require('fs');
const port=8000;

app.use(express.urlencoded({extended:false}));

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

app.route('/api/user/:id').get((req,res)=>{
    const id=Number(req.params.id);
    const u=users.find(u=>u.id==id);
    return res.json(u);
})
.patch((req,res)=>{})
.delete((req,res)=>{});

app.post('/api/user',(req,res)=>{
        const body=req.body;
        users.push({...body,id:users.length+1});
        fs.writeFileSync('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
            return res.json({status:'success'});
        });  
    return res.send('User created');
});


app.listen(8000,()=>{
    console.log(`Server is running on port ${port}`);
})