import React, { useMemo } from 'react';
import { useCssHandles } from 'vtex.css-handles';
import useProduct from 'vtex.product-context/useProduct';

const CSS_HANDLES = ['productDetailMainContainer', "addToCartContainer", "productDetailContainer", "productCardImage", "cardTitle", "cardDescription", "benefitsContainer", "descriptionContainer", "benefitsContentMobile", "detailsContentMobile"] as const;


const ProductDetail: StorefrontFunctionComponent = ({children}) => {
    const handles = useCssHandles(CSS_HANDLES);
    const {product} = useProduct();

    const speficications = useMemo(() => {
        let properties = [];
        let images: string[] = [];
        if (!!product) {
           properties = product.properties.filter((p: any) => String(p.name).includes("Beneficio") || String(p.name).includes("Imágenes") || String(p.name).includes("Detalle"))
                        .map((p: any) => ({
                            name: p.name,
                            values: p.values[0]
                        }));
           const imagesToShow = properties.length === 3 && properties.pop();
           images = !!imagesToShow.values ? imagesToShow.values.split(',') : [];
        }
        return {properties, images}
    }, [product]);

    const titles = {
        benefits: "BENEFICIOS",
        details: "DETALLE DEL PRODUCTO"
    }

    return (
        <>
        {speficications.properties.length > 0 && (
        <div className={`${handles.productDetailMainContainer} vtex-store-componentes-3-x-container mw9 center ph5-m ph3`}>
            <div className={`${handles.productDetailContainer}`}>
                <div className={`dn flex-ns justify-center flex-wrap`}>
                    <div className={`w-50-ns`}>
                        <img src={speficications.images[0]} className={`${handles.productCardImage} w-100`} />
                    </div>
                    <div className={`${handles.benefitsContainer} w-50 flex flex-column justify-center pa5`}>
                        <h3 className={`${handles.cardTitle}`}>{titles.benefits}</h3>
                        <span className={`t-small ${handles.cardDescription}`}>{speficications.properties[0].values}</span>
                        <div className={`${handles.addToCartContainer} w-50 mt6`}>
                            {children}
                        </div>
                    </div>
                    <div className={`${handles.descriptionContainer} w-50 flex flex-column justify-center pa5`}>
                        <h3 className={`${handles.cardTitle}`}>{titles.details}</h3>
                        <span className={`t-small ${handles.cardDescription}`}>{speficications.properties[1].values}</span>
                        <div className={`${handles.addToCartContainer} w-50 mt6`}>
                            {children}
                        </div>
                    </div>
                    <div className={`w-50`}>
                        <img src={speficications.images[1]} className={`${handles.productCardImage} w-100`} />
                    </div>
                </div>
                <div className={`${handles.benefitsContentMobile} dn-ns flex flex-column justify-center ph6`}>
                    <div className={`w-100`}>
                        <img src={speficications.images[0]} className={`${handles.productCardImage} w-100`} />
                    </div>
                    <div className={`${handles.benefitsContainer} w-100 flex flex-column justify-center pa5`}>
                        <h3 className={`${handles.cardTitle}`}>{titles.benefits}</h3>
                        <span className={`t-small ${handles.cardDescription}`}>{speficications.properties[0].values}</span>
                        <div className={`${handles.addToCartContainer} w-75 mt5`}>
                            {children}
                        </div>
                    </div>
                </div>
                <div className={`${handles.detailsContentMobile} dn-ns flex flex-column-reverse justify-center ph6`}>
                    <div className={`${handles.benefitsContainer} w-100 flex flex-column justify-center pa5`}>
                        <h3 className={`${handles.cardTitle}`}>{titles.details}</h3>
                        <span className={`t-small ${handles.cardDescription}`}>{speficications.properties[1].values}</span>
                        <div className={`${handles.addToCartContainer} w-75 mt5`}>
                            {children}
                        </div>
                    </div>
                    <div className={`w-100`}>
                        <img src={speficications.images[1]} className={`${handles.productCardImage} w-100`} />
                    </div>
                </div>
            </div>
        </div>
        )}
        </>
    )
}

export default ProductDetail;