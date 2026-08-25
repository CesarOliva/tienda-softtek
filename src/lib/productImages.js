export function getProductImage(product) {
    const image = product.images?.[0];

    return image?.ruta ?? null;
}

export function addProductImage(product) {
    return {
        ...product,
        imagen: getProductImage(product),
    };
}