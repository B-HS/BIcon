import { PROPERTIES, PropertyMap } from '@/lib/constant'
import { headers } from 'next/headers'
import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'
export const runtime = 'edge'
export const GET = async (request: NextRequest) => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const { searchParams } = new URL(request.url)
    const { width, height, icon, cIcon, iconBgColor, bgColor, textColor, text, borderRadius } = Object.keys(PROPERTIES).reduce(
        (prev, next) => ({ ...prev, [next]: searchParams.get(next) }),
        {},
    ) as PropertyMap

    const props = {
        width: Number(width) || 100,
        height: Number(height) || 25,
        bgColor: bgColor ? bgColor : 'transparent',
        textColor: textColor ? textColor : '#000',
        iconBgColor: iconBgColor ? iconBgColor : 'transparent',
        text: text || '',
        icon: cIcon || `${currentURL}/${icon}.svg` || `${currentURL}/logo.svg`,
        borderRadius: (Number(borderRadius) || 0) + 'px',
    }

    return new ImageResponse(
        (
            <div
                style={{
                    width: props.width + 'px',
                    height: props.height + 'px',
                    backgroundColor: props.bgColor,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'baseline',
                    borderRadius: props.borderRadius,
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        backgroundColor: props.iconBgColor,
                        width: props.height + 'px',
                        height: props.height + 'px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {/* eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element */}
                    <img
                        src={props.icon}
                        style={{
                            objectFit: 'contain',
                            width: props.height - props.height / 5,
                            height: props.height - props.height / 5,
                            marginLeft: props.height - props.height / 1.5,
                        }}
                    />
                </div>
                <span
                    style={{
                        color: props.textColor,
                        textAlign: 'center',
                        flex: 1,
                        justifyContent: 'center',
                        fontSize: props.height / 1.5 + 'px',
                    }}
                >
                    {props.text}
                </span>
            </div>
        ),
        {
            width: props.width,
            height: props.height,
            fonts: [
                {
                    name: 'M PLUS Rounded 1c',
                    data: await fetch(new URL(currentURL + '/mplus.ttf', currentURL)).then((res) => res.arrayBuffer()),
                    weight: 100,
                    style: 'normal',
                },
            ],
        },
    )
}
