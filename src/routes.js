const router = require('express').Router();
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const controller = require('./controller');
const controllerList = require('./controllerList');

router.get('/', controllerList.list);
router.get('/accepted', controllerList.listAccepted);
router.get('/review', controllerList.listReview);
router.get('/discarded', controllerList.listDiscarded);
router.post('/accept/:id', controllerList.accept);
router.post('/review/:id', controllerList.review);
router.post('/discard/:id', controllerList.discard);
router.post('/reset/:id', controllerList.reset);
router.post('/delete/:id', controllerList.delete);
router.post('/load', upload.single("jsonfile"), controller.load);
router.post('/updateThumbs', upload.single("jsonfile"), controller.updateThumbs);
router.post('/test', controller.test);
router.post('/download', controller.download);

module.exports = router;