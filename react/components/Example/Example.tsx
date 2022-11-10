import React from 'react';
import { useCssHandles } from 'vtex.css-handles';
import { ExampleProps } from '../../typings/example';

/**
 * declare todos los modificadores de clases que necesite su proyecto recuerde
 * que esto permitira que su proyectos sea configurable
 */
const CSS_HANDLES = ['labelSeller'] as const;
/**
 * declaracion del componente
 */
const Example: StorefrontFunctionComponent<ExampleProps> = ({ label }) => {
    const handles = useCssHandles(CSS_HANDLES);
    return (
        <React.Fragment>
            <div className={`ml1 mt3 t-body`}>
                <span className={`c-muted-2 ${handles.labelSeller}`}>
                    {label}{' '}
                </span>
            </div>
        </React.Fragment>
    );
};

/**
 * propiedades por defecto del componete
 */
Example.defaultProps = {
    label: 'Vendido por:',
};

/**
 * esquema base del componenete esto habilita el site editor desde el admin
 */

Example.schema = {
    title: 'admin/editor.seller-name.title',
    description: 'admin/editor.seller-name.description',
    properties: {
        label: {
            title: 'admin/editor.seller-name.label.title',
            type: 'string',
        },
    },
};

export default Example;
