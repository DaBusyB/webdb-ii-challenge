const router = require('express').Router();
const knex = require('knex');

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.db3'
  },
  debug: true,
};

const db = knex(knexConfig);

router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(newZoo => {
        res.status(201).json(newZoo)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.get('/', (req, res) => {
  db('zoos')
    .then(zoos => {
      res.status(200).json(zoos);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/:id', (req, res) => {
    const zooId = req.params.id

    db('zoos')
    .where({id: zooId})
    .first()

    .then(zoo => {
        res.status(200).json(zoo)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

router.put('/:id', (req, res) => {
    db('zoos')
    .where({id: req.params.id})
    .update(req.body)
    .then(count => {
        if(count > 0) {
            res.sratus(200).json(count)
        } else {
            res.status(404).json({message: 'Record not found'})
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

module.exports = router;
