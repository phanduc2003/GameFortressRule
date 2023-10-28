const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const EnemyController = require('../controllers/EnemyController');
let middleware = require('../middleware/upload');

//GET ALL ENEMY
router.get('/', async (req, res) => {
    try {
        let enemies = await EnemyController.getAllEnemy();
        enemies = enemies.map((el, index) => {
            return {
                _id: el._id,
                nameEnemy: el.nameEnemy,
                health: el.health,              
                speed: el.speed,
                ability: el.ability,
                image: el.image,
                index: index + 1,
            }
        });
        res.render('admin/enemy/manageEnemies', { mt : enemies }); 
        console.log(enemies);
    } catch (error) {
        console.log(error);
        res.redirect('/admin/enemy/manageEnemies'); 
    }
});

//INSERT ENEMY
router.get('/new', (req, res) => {
    let userId = req.query.id;
    res.render('admin/enemy/insertEnemies', {userId: userId});
});

//HANDLE INSERT ENEMY
router.post('/new', [middleware.single('image'),], async (req, res, next) => {
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameEnemy, health, speed, ability, image} = req.body;
        image = file ? file.filename : '';
        await EnemyController.insert( nameEnemy, health, speed, ability, image);
        res.redirect(`/enemy?id=${userId}`)
    } catch (error) {
        console.log(error);
    }
});

//UPDATE ENEMY
router.get('/:id/edit', async function (req, res, next) {
    let _id = req.params.id;
    let userId = req.query.id;
    try {
        let enemies = await EnemyController.getById(_id);
        res.render('admin/enemy/updateEnemies', { mt: enemies, userId: userId });
    } catch (error) {
        console.log(error);
    }
});

//HANDLE UPDATE ENEMY
router.post('/:id/edit', [middleware.single('image'), ], async function (req, res, next) {
    let _id = req.params.id;
    let userId = req.query.id;
    try {
        let { file } = req;
        let { nameEnemy, health, speed, ability, image } = req.body;
        if (file) {
            image = file.filename;
        }else{
            image = image;
        } 
        await EnemyController.update(_id, nameEnemy, health, speed, ability, image);
        res.redirect(`/enemy?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

//DELETE USER
router.get('/:id/deleteById', async (req, res, next) => {
    let _id = req.params.id;
    let userId = req.query.id; 
    try {
        await EnemyController.deleteById(_id);
        console.log("Delete enemy OK");
        res.redirect(`/enemy?id=${userId}`);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
