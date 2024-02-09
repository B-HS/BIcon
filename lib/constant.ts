type PropertiesType = {
    [key: string]: {
        name: string
        placeholder: string
        required?: boolean
        type: string
        min?: number
        max?: number
    }
}

export const PROPERTIES: PropertiesType = {
    width: {
        name: 'Width',
        placeholder: '100',
        type: 'number',
        required: true,
    },
    height: {
        name: 'Height',
        placeholder: '25',
        max: 250,
        type: 'number',
        required: true,
    },
    bgColor: {
        name: 'Background Color',
        placeholder: '#000',
        type: 'text',
    },
    textColor: {
        name: 'Text Color',
        placeholder: '#FFF',
        type: 'text',
    },
    text: {
        name: 'Text',
        placeholder: '',
        type: 'text',
        required: true,
    },
    borderRadius: {
        name: 'Border Radius',
        placeholder: '1',
        max: 30,
        type: 'number',
    },
    icon: {
        name: 'Icon',
        placeholder: '',
        type: 'select',
        required: true,
    },
    cIcon: {
        name: 'Custom Icon',
        placeholder: 'Image / Svg link',
        type: 'text',
        required: true,
    },
    iconBgColor: {
        name: "Icon's Background Color",
        placeholder: 'For svg / none-bg img',
        type: 'text',
    },
}

export const presetIcon = [
    'express',
    'github',
    'java',
    'js',
    'ts',
    'react',
    'next',
    'spring',
    'svelte',
    'vue',
    'nuxt',
    'linux',
    'tailwind',
    'sass',
    'git',
    'jenkins',
    'docker',
    'node',
]

export type PropertyMap = {
    [key in keyof typeof PROPERTIES]: string | null
}
