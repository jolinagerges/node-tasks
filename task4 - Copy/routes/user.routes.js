
const router = require("express").Router()
const userController = require("../controller/user.controller.js")
//.get("/", userController)

router.get("/", userController.showAll)
router.get("/add", userController.addUser)
router.post("/add", userController.addUserlogic)
router.get("/show/:id", userController.show)
router.get("/edit/:id", userController.editUser)
router.post("/edit/:id", userController.editUserlogic)
router.get("/delete/:id", userController.deleteUser)
 router.get("/operation/:id", userController.operations)
 router.post("/operation/:id", userController.operationslogic)

module.exports = router  