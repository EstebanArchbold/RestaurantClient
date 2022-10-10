import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router';
import FileUploader from 'react-firebase-file-uploader';

const NewDish = () => {

// images state
    const [upload, saveUpload] = useState(false);
    const [progress, saveProgress] = useState(0);
    const [urlimage, saveUrlimage] = useState('');

// context with firebase operations
    const { firebase } = useContext(FirebaseContext);

    // console.log(firebase);

// hook to redirect
    const navigate = useNavigate();


//Validacion y leer los datos del formulario
    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            category: '',
            image: '',
            description: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                        .min(3, 'Los platillos deben tener al menos 3 caracteres')
                        .required('El nombre del platillo es obligatorio'),
            price: Yup.number()
                        .min(1, 'Debes agregar un numero')
                        .required('El precio es obligatorio'),
            category: Yup.string()
                        .min(5,'La descripcion no tiene el largo suficiente')
                        .required('La descripcion es obligatoria'),
        }),
        onSubmit: plates => {
            try {
                plates.exist = true;
                plates.image = urlimage;
                firebase.db.collection('products').add(plates);

                // Redirection6
                navigate('/menu');
            } catch (error) {
                console.log(error);
            }
        }
    });

    // Images FUnctions
    const handleUploadStart  = () => {
        saveProgress(0);
        saveUpload(true);
    }

    const handleUploadError  = error => {
        saveUpload(false);
        console.log(error);
    }

    const handleUploadSuccess  = async name => {
        saveProgress(100);
        saveUpload(false);

        //save destiny url
            const url = await firebase
                .storage
                .ref("products")
                .child(name)
                .getDownloadURL();
            console.log(url);
            saveUrlimage(url);
    }

    const handleProgress  = progress => {
        saveProgress(progress);
        console.log(progress);
    }

    return ( 
        <>
            <h1 className="text-3xl font-light mb-4"> Agregar Nueva Orden</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block 
                            text-gray-700 
                            text-sm
                            font-bold"
                            htmlFor="name">Nombre</label>
                            <input
                                className="shadow 
                                appearance-none 
                                border 
                                rounded 
                                w-full 
                                py-2 
                                px-3 
                                text-gray-700 
                                leading-tight 
                                focus:outline-none 
                                focus:shadow-outline"
                                id="name"
                                type="text"
                                placeholder="Nombre Platillo"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.name && formik.errors.name ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null 
                        }

                        <div className="mb-4">
                            <label className="block 
                            text-gray-700 
                            text-sm
                            font-bold"
                            htmlFor="price">Precio</label>
                            <input
                                className="shadow 
                                appearance-none 
                                border 
                                rounded 
                                w-full 
                                py-2 
                                px-3 
                                text-gray-700 
                                leading-tight 
                                focus:outline-none 
                                focus:shadow-outline"
                                id="price"
                                type="number"
                                placeholder="$20"
                                min="0"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        { formik.touched.price && formik.errors.price ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.price}</p>
                            </div>
                        ) : null 
                        }

                        <div className="mb-4">
                            <label className="block 
                            text-gray-700 
                            text-sm
                            font-bold"
                            htmlFor="name">Categoria</label>
                            <select className="shadow 
                                appearance-none 
                                border 
                                rounded 
                                w-full 
                                py-2 
                                px-3 
                                text-gray-700 
                                leading-tight 
                                focus:outline-none 
                                focus:shadow-outline"
                                id="price"
                                name="category"
                                value={formik.values.category}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >
                                <option value="">-- Seleccione Categoria --</option>
                                <option value="breakfast">Desayuno</option>
                                <option value="lunch">Almuerzo</option>
                                <option value="dinner">Cena</option>
                                <option value="drinks">Bebidas</option>
                                <option value="dessert">Postre</option>
                                <option value="salad">Ensalada</option>
                            </select>
                        </div>

                        { formik.touched.category && formik.errors.category ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.category}</p>
                            </div>
                        ) : null 
                        }

                        <div className="mb-4">
                            <label className="block 
                            text-gray-700 
                            text-sm
                            font-bold"
                            htmlFor="image">Imagen</label>
                            <FileUploader
                            // Only Accept Images
                                accept="image/*"
                                id="image"
                                name="image"
                                randomizeFilename // generate a random name to dont duplicate images name
                                storageRef={firebase.storage.ref("products")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>
                        {/* Progress bar */}
                        { upload && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 text-white px-2 text-sm h-12 flex items-center">
                                    {progress} %
                                </div>
                            </div>
                        ) }

                        { urlimage && (
                            <p className="bg-green-500 text-white p-3 text-center my-5">
                                La imagen sse subio correctamente
                            </p>
                        ) }

                        { formik.touched.description && formik.errors.description ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert">
                                <p>{formik.errors.description}</p>
                            </div>
                        ) : null 
                        }

                        <div className="mb-4">
                            <label className="block 
                            text-gray-700 
                            text-sm
                            font-bold"
                            htmlFor="description">Descripcion</label>
                            <textarea
                                className="shadow 
                                appearance-none 
                                border 
                                rounded 
                                w-full 
                                py-2 
                                px-3 
                                text-gray-700 
                                leading-tight 
                                focus:outline-none 
                                focus:shadow-outline
                                h-40"
                                id="description"
                                placeholder="Descriipcion del  Platillo"
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                        </div>


                        <input 
                            type="submit"
                            className="
                            bg-gray-800
                            hover:bg-gray-900 
                            w-full 
                            mt-5 
                            p-2 
                            text-white 
                            uppercase 
                            font-bold"
                            value="Agregar Platillo"
                        />

                    </form>
                </div>
            </div>
        </>
    );
}

export default NewDish;