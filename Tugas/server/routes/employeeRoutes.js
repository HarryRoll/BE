import { Router } from "express";
import indexCtrl from "../controller/indexCtrl";

const router = Router()

router.get('/',indexCtrl.employCtrl.findAll)
router.get('/:id',indexCtrl.employCtrl.findOne)
router.post('/',indexCtrl.employCtrl.create)
router.put('/:id',indexCtrl.employCtrl.update)
router.delete('/:id',indexCtrl.employCtrl.deleted)
router.get('/sql/:id',indexCtrl.employCtrl.querySQL)
export default router