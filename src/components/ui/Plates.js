import React from 'react';

const Plates = ({plates}) => {

    const {name, image, category, price, description} = plates;
    return (
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="flex flex-row">
                    <div className="lg:w-7/12 xl:w-3/12">
                        <img src={image} alt=" imagen plato" />
                    </div>
                    <div className="lg:w-5/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{name}</p>
                        <p clasName="text-gray-600 mb-4">Categoria: {''}
                            <span className="text-gray-700 font-bold">{category.toUpperCase()}</span>
                        </p>
                        <p clasName="text-gray-600 mb-4">Descripcion: {''}{description}</p>
                        <p clasName="text-gray-600 mb-4">Precio: {''}
                            <span className="text-gray-700 font-bold">${price}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Plates