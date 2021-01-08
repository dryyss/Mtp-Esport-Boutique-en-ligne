import bcrypt from 'bcryptjs';

const data ={
    users: [
        {
            firstName:'Andrys',
            name: 'Magar',
            email:'AndrysAdmin@Mtp.com',
            password:  bcrypt.hashSync('1234' ,8),
            isAdmin: true
        },
        {   firstName:'Pierre',
            name: 'Pastor',
            email:'PierreAdmin@Mtp.com',
            password: bcrypt.hashSync('1234' ,8),
            isAdmin: true
        },
        {
            name: 'Iza',
            email:'IzaAdmin@Mtp.com',
            password: bcrypt.hashSync('1234' ,8),
            isAdmin: true
        },
        {
            name: 'Slimii',
            email:'SlimiiAdmin@Mtp.com',
            password: bcrypt.hashSync('1234' ,8),
            isAdmin: true
        },
        {
            name: 'dryyssUser',
            email:'user@example.com',
            password: bcrypt.hashSync('1234' ,8),
            isAdmin: false
        },
    ],
    products:[
        {
            name:'Maillot MTP Esport ',
            category:'Vetements',
            image:'/images/Maillot1.jpg',
            price: 80,
            note:4.5,
            numReviews:10,
            description:'Maillot Mtp tres bonne qualité',
            countInStock:50,
        },
        { 
            name:'Chaise Gaming Mtp',
            category:'Chaise',
            image:'/images/chaise1.jpg',
            price: 250,
            note:5,
            numReviews:200,
            description:'Chaise Gaming Mtp tres bonne qualité',
            countInStock:50,
        },
        {
            
            name:'Clavier Gaming MTP Esport',
            category:'Gaming',
            image:'/images/clavier1.jpg',
            price: 69,
            note:4.5,
            numReviews:140,
            description:'Clavier Gaming MTP tres bonne qualité',
            countInStock:50,
        },
        {            
            name:'Ecran Gaming MTP Esport',
            category:'Gaming',
            image:'/images/ecran1.jpg',
            price: 220,
            note:5,
            numReviews:50,
            description:'Ecran Gaming Mtp tres bonne qualité',
            countInStock:0,
        },
        {
            
            name:' Souris Gaming MTP Esport',
            category:'Gaming',
            image:'/images/souris1.jpg',
            price: 40,
            note:3.5,
            numReviews:30,
            description:'Souris Gaming Mtp tres bonne qualité',
            countInStock:50,
        },
        { 
            name:'Tapis MTP Esport',
            category:'Gaming',
            image:'/images/tapis1.jpg',
            price: 20,
            note:5,
            numReviews:5,
            description:'Tapis Mtp tres bonne qualité',
            countInStock:0,
        },
        { 
            name:'Pc Gaming MTP Esport ',
            category:'Gaming',
            image:'/images/pc1.jpg',
            price: 1600,
            note:5,
            numReviews:23,
            description:'Pc Gaming Mtp tres bonne qualité',
            countInStock:50,
        },
    ]
}
export default data;