//const { Router } = require('express');

//const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

/*const { crearCategoria,
        obtenerCategorias,
        obtenerCategoria,
        actualizarCategoria, 
        borrarCategoria } = require('../controllers/categorias');

const router = Router();*/

/**
 * {{url}}/api/categorias
 */

//  Obtener todas las categorias - publico
//router.get('/', obtenerCategorias );

// Obtener una categoria por id - publico
/*router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
], obtenerCategoria );*/

// Crear categoria - privado - cualquier persona con un token válido
/*router.post('/', [ 
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria );*/

// Actualizar - privado - cualquiera con token válido
/*router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
],actualizarCategoria );*/

// Borrar una categoria - Admin
/*router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos,
],borrarCategoria);*/



//module.exports = router;