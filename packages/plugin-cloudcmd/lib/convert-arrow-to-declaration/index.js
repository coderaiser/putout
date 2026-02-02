export const report = () => `Use 'declaration' instead 'arrow' for 'init/show/hide'`;

export const match = () => ({
    'export const __a = async (__args) => __body': isClientModule,
    'export const __a = (__args) => __body': isClientModule,
});

export const replace = () => ({
    'export const __a = async (__args) => __body': 'export async function __a(__args) {__body}',
    'export const __a = (__args) => __body': 'export function __a(__args) {__body}',
});

const isClientModule = ({__a}) => {
    const {name} = __a;
    
    return /^(init|show|hide)$/.test(name);
};
