const express = require('express')
const app = express()
const mongoose = require('mongoose')
const body_parser = require('body-parser')
const cors = require('cors')
const item = require('../server/models')
const multer = require('multer')
const imgmodel = require('./imgmodel')

app.use(cors())
app.use(body_parser.json())


//create new items
app.post('/api/items',(req,res)=>{
    const {name,description} = req.body
    const newitem = new item({name,description});
    newitem.save()
    .then(item=>{
        res.json(item)
    }).catch(e=>{
        res.status(400).json({error:"failed to post"})
    })
})

//get all items
app.get('/api/items',(req,res)=>{
    item.find()
    .then(items =>{
        res.json(items)
    }).catch(e=>{
        res.status(400).json({error:'failed'})
    })
})

//update an items 
app.put('/api/items/:id',(req,res)=>{
    const itemid = req.params.id;
    const {name,description} = req.body
    item.findByIdAndUpdate(itemid,{name,description},{new:true})
    .then(item=>{
        res.json(item);
    })
    .catch(err=>{
        res.status(400).json({error:'failed'})
    })
})

//delete items
app.delete('/api/items/:id',(req,res)=>{
    const itemid = req.params.id;
    item.findByIdAndDelete(itemid)
    .then(()=>{
        res.json({message:'item deleted'});
    })
    .catch(err=>{
        res.status(400).json({error:'failed'})
    })
})

// const storage = multer.diskStorage({
//     description:(req,file,cd)=>{
//         cd(null,'public/images')
//     },
//     filename:(req,file,cd)=>{
//         cd(null,file.filedname + '_' + Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({
//     storage:storage
// })

//upload image
app.post('/upload',async(req,res)=>{
        const response = req.body
            const img =  new imgmodel({response})
            img.save()
            .then(response=>{
                res.json('post')
            })
            .catch(error=>{
                res.status(400).json(error)

            })
         

})
app.get('/upload',async(req,res)=>{
    imgmodel.find()
    .then(response=>{
        res.json(response)
    })
    .catch(error=>{
        res.status(400).json(error)
    }) 
})


mongoose.connect('mongodb://localhost:27017/curd',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected'))
.catch((e)=>console.log(e))

app.listen(4000,()=>{
    console.log('running')
})