import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.post('/',indexCtrl.departCtrl.createR)
router.get('/',indexCtrl.departCtrl.findAll)
router.get('/:id',indexCtrl.departCtrl.findOne)
router.post('/',indexCtrl.departCtrl.create)
router.put('/:id',indexCtrl.departCtrl.update)
router.delete('/:id',indexCtrl.departCtrl.deleted)
router.post('/sql/:id',indexCtrl.departCtrl.querySQL)
export default router