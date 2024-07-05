'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'
import { PROPERTIES, presetIcon } from '@/lib/constant'
import { Cross1Icon } from '@radix-ui/react-icons'
import Image from 'next/image'
import { useState } from 'react'

const Home = () => {
    const [formValues, setFormValues] = useState<Record<string, string>>({})
    const { toast } = useToast()
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, propertyName: string) => {
        setFormValues({
            ...formValues,
            [propertyName]: e.target.value,
        })
        propertyName === 'height' && Number(e.target.value) >= 250 && setFormValues({ ...formValues, [propertyName]: '250' })
        propertyName === 'borderRadius' && Number(e.target.value) >= 30 && setFormValues({ ...formValues, [propertyName]: '30' })
    }

    const copyToClipboard = async (isMarkdown?: boolean) => {
        let isNotValidated = false
        for (const [key, value] of Object.entries(formValues)) {
            if (['width', 'height', 'text'].includes(key) && !value) {
                isNotValidated = true
                break
            }
        }
        if (!formValues.icon && !formValues.cIcon) isNotValidated = true
        if (isNotValidated) {
            toast({
                title: 'ERROR',
                description: 'Need to fill required fields',
            })
            return
        }

        if (!!formValues.cIcon && !!formValues.icon) delete formValues.icon
        Object.keys(formValues).forEach((ele: string | number) => !formValues[ele] && delete formValues[ele])

        let text = window.location.href + 'api/icon?' + new URLSearchParams(formValues).toString()
        if (isMarkdown) {
            text = `![${formValues.icon}_icon](${text})`
        }
        try {
            await navigator.clipboard.writeText(text)
            toast({
                title: 'Badge Icon URL Copied!',
                description: (
                    <Image
                        src={'/api/icon?' + new URLSearchParams(formValues).toString()}
                        width={Number(formValues.width)}
                        height={Number(formValues.height)}
                        alt={formValues.icon}
                        quality={100}
                    />
                ),
            })
        } catch (error) {
            console.error('Error copying text to clipboard:', error)
        }
    }
    return (
        <section className='flex flex-col gap-2'>
            <Card>
                <CardHeader>
                    <CardDescription>
                        <span className='text-red-500'>*</span> must be entered to generate.
                    </CardDescription>
                    <CardDescription>Set an icon or a custom icon to generate a badge icon.</CardDescription>
                    <CardDescription>If you want a higher resolution image, increase the width or height value.</CardDescription>
                </CardHeader>
                <CardContent className='flex items-center justify-between flex-wrap'>
                    {Object.entries(PROPERTIES).map(([propertyName, property]) => (
                        <div className='w-1/3 px-3' key={propertyName}>
                            <section className='flex items-center pb-1 gap-1'>
                                {property.required && <span className='text-red-500'>*</span>}
                                <Label htmlFor={propertyName}>{property.name}</Label>
                                {property.type === 'select' && formValues['icon'] && (
                                    <Button
                                        onClick={() =>
                                            setFormValues((prev) => {
                                                delete prev['icon']
                                                return {...prev}
                                            })
                                        }
                                        variant={'link'}
                                        className='p-0 size-fit'
                                    >
                                        <Cross1Icon />
                                    </Button>
                                )}
                            </section>
                            {property.type !== 'select' && (
                                <Input
                                    type={property.type}
                                    id={propertyName}
                                    placeholder={property.placeholder}
                                    max={property.max}
                                    value={formValues[propertyName] || ''}
                                    onChange={(e) => handleInputChange(e, propertyName)}
                                    disabled={propertyName === 'cIcon' && (!formValues.width || !formValues.height)}
                                />
                            )}
                            {property.type === 'select' && (
                                <Select
                                    value={formValues['propertyName'] || ''}
                                    onValueChange={(name) => handleInputChange({ target: { value: name } } as any, propertyName)}
                                    disabled={!formValues.width || !formValues.height}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={property.placeholder} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {presetIcon.sort() &&
                                            presetIcon.map((icon) => (
                                                <SelectItem key={icon} value={icon}>
                                                    <section className='flex gap-2'>
                                                        <Image src={`/${icon}` + '.svg'} width={20} height={20} alt={icon} />
                                                        <span>{icon}</span>
                                                    </section>
                                                </SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardContent className='p-6 h-full flex justify-center items-center select-none gap-10'>
                    <section className='flex-1 flex justify-center items-center w-full'>
                        {formValues.cIcon || formValues.icon || formValues.icon ? (
                            <Image
                                src={formValues.cIcon || '/api/icon?' + new URLSearchParams(formValues).toString()}
                                width={Number(formValues.width)}
                                height={Number(formValues.height)}
                                alt={formValues.icon || 'custom-icon'}
                                quality={100}
                            />
                        ) : (
                            <span>No Icon</span>
                        )}
                    </section>
                    <section className='flex flex-col gap-2'>
                        <Button onClick={() => copyToClipboard(true)} size={'sm'}>
                            Copy as Markdown Style
                        </Button>
                        <Button onClick={() => copyToClipboard()} size={'sm'}>
                            Copy Icon URL
                        </Button>
                    </section>
                </CardContent>
            </Card>
        </section>
    )
}

export default Home
