import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.depenCtrl.findAll)
router.get('/:id',indexCtrl.depenCtrl.findOne)
router.post('/',indexCtrl.depenCtrl.create)
router.put('/:id',indexCtrl.depenCtrl.update)
router.delete('/:id',indexCtrl.depenCtrl.deleted)
router.get('/sql/:id',indexCtrl.depenCtrl.querySQL)
export default router